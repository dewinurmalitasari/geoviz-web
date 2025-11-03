import {createFileRoute} from '@tanstack/react-router'
import PageHeader from "@/components/root/page-header.tsx";
import GeoCard from "@/components/geo/geo-card.tsx";
import GeoButton from "@/components/geo/geo-button.tsx";
import ShapePointsInput from "@/components/visualization/shape-points-input.tsx";
import {toast} from "sonner";
import {SquareKanban} from "lucide-react";
import {useState} from "react";
import {
    type DilatationValue,
    type Point,
    type ReflectionValue,
    type RotationValue,
    type TranslationValue,
    VISUALIZATION_TYPES
} from "@/type.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import GeoTabs from "@/components/geo/geo-tabs.tsx";
import {useVisualizationTabs} from "@/components/visualization/visualization-tabs.tsx";

export const Route = createFileRoute('/visualizations/$visualizationType')({
    beforeLoad: ({params}) => {
        // Check if visualizationType is valid by comparing with VISUALIZATION_TYPES
        const validTypes = Object.values(VISUALIZATION_TYPES) as string[];
        if (!validTypes.includes(params.visualizationType)) {
            throw new Error('Not Found');
        }
    },
    component: RouteComponent,
    errorComponent: ({error}) => {
        if (error.message === 'Not Found') {
            return (
                <ErrorPage
                    status={404}
                    statusText="Not Found"
                    title="Halaman Tidak ditemukan"
                    message="Halaman yang Anda cari tidak ditemukan."
                />
            )
        }

        return (
            <ErrorPage
                status={500}
                statusText="Internal Server Error"
                title="Terjadi Kesalahan memuat data pengguna"
                message={error.message || "Gagal memuat data pengguna."}
            />
        );
    },
})

function RouteComponent() {
    const {visualizationType} = Route.useParams()
    const [shapePoints, setShapePoints] = useState<Point[]>([])
    const [translationValue, setTranslationValue] = useState<TranslationValue>({
        translateX: 2,
        translateY: 2,
        translateZ: 2
    })
    const [dilatationValue, setDilatationValue] = useState<DilatationValue>({scaleFactor: 2,})
    const [rotationValue, setRotationValue] = useState<RotationValue>({angle: 90, axis: 'x'})
    const [reflectionAxis, setReflectionAxis] = useState<ReflectionValue>({
        axis: visualizationType === VISUALIZATION_TYPES.SHAPE_3D ? 'radio-xy-plane' : 'y-axis',
        k: 0
    })

    const handlePlotClick = (points: Point[]) => {
        toast.success(`Plotting ${points.length} titik...`)
        console.log("Plotting points:", points)
        // TODO:Here you would typically send the points to your visualization engine
    }

    const handleStartVisualization = (transformationType: string) => {
        // Dilatation divide by zero check
        if (transformationType === 'dilatation' && dilatationValue.scaleFactor === 0) {
            setDilatationValue(
                {...dilatationValue, scaleFactor: 1}
            )
            dilatationValue.scaleFactor = 1
        }

        toast.success("Memulai visualisasi...")
        console.log("Starting visualization with points:", shapePoints)

        console.log(transformationType)
        console.log(translationValue, dilatationValue, rotationValue, reflectionAxis)
        // TODO:Start your visualization logic here
    }

    const tabs = useVisualizationTabs({
        visualizationType,
        shapePoints,
        translationValue,
        setTranslationValue,
        dilatationValue,
        setDilatationValue,
        rotationValue,
        setRotationValue,
        reflectionAxis,
        setReflectionAxis,
        onStartVisualization: handleStartVisualization,
    })

    return (
        <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
            <PageHeader
                title={`Visualisasi ${visualizationType.translateVisualizationType()}`}
                description={`Visualisasi transformasi geometri pada ${visualizationType.translateVisualizationType().toLowerCase()}.`}
                colorScheme="orange"
            />

            <GeoCard
                content={
                    <div className="flex flex-col xl:flex-row xl:space-x-6 space-y-6 xl:space-y-0">

                        <div className="flex flex-col flex-2 space-y-4">
                            {/* Visualization Canvas Area TODO: change and make this have a fixed height*/}
                            <div
                                className="flex-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 flex items-center justify-center">
                                <div className="text-center text-gray-500 dark:text-gray-400">
                                    <div className="text-lg font-semibold mb-2">Area Visualisasi</div>
                                    <div className="text-sm">
                                        {shapePoints.length > 0
                                            ? `${shapePoints.length} titik siap untuk divisualisasikan`
                                            : "Tambahkan titik untuk memulai visualisasi"
                                        }
                                    </div>
                                </div>
                            </div>

                            {/*Transformation Input and Play*/}
                            <GeoTabs
                                defaultValue="translation"
                                tabs={tabs}
                                variant="pills"
                                fullWidth={true}
                                className="flex-1"
                            />
                        </div>


                        {/* Plot Shape Input */}
                        <div className="flex flex-col space-y-4 flex-1">
                            <GeoButton
                                variant="secondary"
                                onClick={() => handlePlotClick(shapePoints)}
                                className="h-fit"
                            >
                                <SquareKanban/> Plot Titik
                            </GeoButton>

                            {/* Shape Points Input */}
                            <ShapePointsInput
                                onPointsChange={(points) => setShapePoints(points)}
                                dimension={visualizationType === VISUALIZATION_TYPES.SHAPE_3D ? "3d" : "2d"}
                                maxPoints={8}
                                minPoints={3}
                                className="p-4 rounded-xl border border-deep-purple-200"
                            />
                        </div>
                    </div>
                }
            />
        </div>
    )
}