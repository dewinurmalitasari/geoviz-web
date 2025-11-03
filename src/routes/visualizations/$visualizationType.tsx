import {createFileRoute} from '@tanstack/react-router'
import PageHeader from "@/components/root/page-header.tsx";
import GeoCard from "@/components/geo/geo-card.tsx";
import GeoButton from "@/components/geo/geo-button.tsx";
import ShapePointsInput from "@/components/visualization/shape-points-input.tsx";
import {toast} from "sonner";
import {FlipHorizontal, Move, Play, RotateCw, SquareKanban, ZoomIn} from "lucide-react";
import {useMemo, useState} from "react";
import {
    type DilatationValue,
    type Point,
    type ReflectionValue,
    type RotationValue,
    TRANSFORMATION_TYPES,
    type TranslationValue,
    VISUALIZATION_TYPES
} from "@/type.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import GeoTabs from "@/components/geo/geo-tabs.tsx";
import GeoInput from "@/components/geo/geo-input.tsx";
import GeoSelect from "@/components/geo/geo-select.tsx";

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
    const reflectionOptions = visualizationType === VISUALIZATION_TYPES.SHAPE_3D
        ? [
            {value: 'radio-xy-plane', label: 'Bidang XY'},
            {value: 'radio-xz-plane', label: 'Bidang XZ'},
            {value: 'radio-yz-plane', label: 'Bidang YZ'},
            {value: 'origin', label: 'Titik Asal'},
        ]
        : [
            {value: 'origin', label: 'Sumbu Asal'},
            {value: 'x-axis', label: 'Sumbu X'},
            {value: 'y-axis', label: 'Sumbu Y'},
            {value: 'line-y-x', label: 'Garis Y=X'},
            {value: 'line-y-neg-x', label: 'Garis Y=-X'},
            {value: 'line-y-k', label: 'Garis Y=K'},
            {value: 'line-x-k', label: 'Garis X=K'},
        ];

    const handlePlotClick = (points: Point[]) => {
        toast.success(`Plotting ${points.length} titik...`)
        console.log("Plotting points:", points)
        // TODO:Here you would typically send the points to your visualization engine
    }

    const handleStartVisualization = (transformationType: string) => {
        toast.success("Memulai visualisasi...")
        console.log("Starting visualization with points:", shapePoints)

        console.log(transformationType)
        console.log(translationValue, dilatationValue, rotationValue, reflectionAxis)
        // TODO:Start your visualization logic here
    }

    const tabs = useMemo(() => [
        {
            value: TRANSFORMATION_TYPES.TRANSLATION,
            label: TRANSFORMATION_TYPES.TRANSLATION.translateTransformationType(),
            icon: <Move/>,
            content: (
                <div className="p-4 rounded-lg border border-deep-purple-200 space-y-2">
                    <h3 className="text-lg font-bold">
                        Masukkan Nilai Translasi
                    </h3>

                    <div className="flex items-center justify-between md:space-x-4 space-x-0 md:flex-row flex-col md:space-y-0 space-y-2">
                        <div className="flex items-center space-x-4">
                            <GeoInput
                                id="translate-x"
                                icon="X"
                                value={translationValue.translateX}
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    setTranslationValue({
                                        ...translationValue,
                                        translateX: isNaN(value) ? 0 : value
                                    });
                                }}
                                type="number"
                            />

                            <GeoInput
                                id="translate-y"
                                icon="Y"
                                value={translationValue.translateY}
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    setTranslationValue({
                                        ...translationValue,
                                        translateY: isNaN(value) ? 0 : value
                                    });
                                }}
                                type="number"
                            />

                            {visualizationType === VISUALIZATION_TYPES.SHAPE_3D && (
                                <GeoInput
                                    id="translate-z"
                                    icon="Z"
                                    value={translationValue?.translateZ || 0}
                                    onChange={(e) => {
                                        const value = parseFloat(e.target.value);
                                        setTranslationValue({
                                            ...translationValue,
                                            translateZ: isNaN(value) ? 0 : value
                                        });
                                    }}
                                    type="number"
                                />
                            )}
                        </div>

                        <GeoButton
                            variant="primary"
                            onClick={() => handleStartVisualization(TRANSFORMATION_TYPES.TRANSLATION)}
                            className="w-full md:w-fit"
                        >
                            <Play/> Mulai Visualisasi
                        </GeoButton>
                    </div>
                </div>
            )
        },
        {
            value: TRANSFORMATION_TYPES.DILATATION,
            label: TRANSFORMATION_TYPES.DILATATION.translateTransformationType(),
            icon: <ZoomIn/>,
            content: (
                <div className="p-4 rounded-lg border border-deep-purple-200 space-y-2">
                    <h3 className="text-lg font-bold">
                        Masukkan Nilai Dilatasi
                    </h3>

                    <div className="flex items-center justify-between md:space-x-4 space-x-0 md:flex-row flex-col md:space-y-0 space-y-2">
                        <GeoInput
                            id="scale-factor"
                            icon="Skala"
                            value={dilatationValue.scaleFactor}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                setDilatationValue({
                                    ...dilatationValue,
                                    scaleFactor: isNaN(value) ? 1 : value
                                });
                            }}
                            type="number"
                        />

                        <GeoButton
                            variant="primary"
                            onClick={() => handleStartVisualization(TRANSFORMATION_TYPES.DILATATION)}
                            className="w-full md:w-fit"
                        >
                            <Play/> Mulai Visualisasi
                        </GeoButton>
                    </div>
                </div>
            )
        },
        {
            value: TRANSFORMATION_TYPES.ROTATION,
            label: TRANSFORMATION_TYPES.ROTATION.translateTransformationType(),
            icon: <RotateCw/>,
            content: (
                <div className="p-4 rounded-lg border border-deep-purple-200 space-y-2">
                    <h3 className="text-lg font-bold">
                        Masukkan Nilai Rotasi
                    </h3>

                    <div className="flex items-center justify-between md:space-x-4 space-x-0 md:flex-row flex-col md:space-y-0 space-y-2">
                        <GeoInput
                            id="angle"
                            icon="Sudut"
                            value={rotationValue.angle}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                setRotationValue({
                                    ...rotationValue,
                                    angle: isNaN(value) ? 0 : value
                                });
                            }}
                            type="number"
                        />

                        {visualizationType === VISUALIZATION_TYPES.SHAPE_3D && (
                            <GeoSelect
                                id="rotation-axis"
                                value={rotationValue.axis || 'x'}
                                onValueChange={(value) => {
                                    setRotationValue({
                                        ...rotationValue,
                                        axis: value as RotationValue['axis']
                                    });
                                }}
                                options={[
                                    {value: 'x', label: 'Sumbu X'},
                                    {value: 'y', label: 'Sumbu Y'},
                                    {value: 'z', label: 'Sumbu Z'},
                                ]}
                            />
                        )}

                        <GeoButton
                            variant="primary"
                            onClick={() => handleStartVisualization(TRANSFORMATION_TYPES.ROTATION)}
                            className="w-full md:w-fit"
                        >
                            <Play/> Mulai Visualisasi
                        </GeoButton>
                    </div>
                </div>
            )
        },
        {
            value: TRANSFORMATION_TYPES.REFLECTION,
            label: TRANSFORMATION_TYPES.REFLECTION.translateTransformationType(),
            icon: <FlipHorizontal/>,
            content: (
                <div className="p-4 rounded-lg border border-deep-purple-200 space-y-2">
                    <h3 className="text-lg font-bold">
                        Masukkan Nilai Refleksi
                    </h3>

                    <div className="flex items-center justify-between md:space-x-4 space-x-0 md:flex-row flex-col md:space-y-0 space-y-2">
                        <GeoSelect
                            id="axis"
                            value={reflectionAxis.axis || 'x'}
                            onValueChange={(value) => {
                                setReflectionAxis({
                                    ...reflectionAxis,
                                    axis: value as ReflectionValue['axis']
                                });
                            }}
                            options={reflectionOptions}
                        />

                        {(reflectionAxis.axis === 'line-y-k' || reflectionAxis.axis === 'line-x-k') && (
                            <GeoInput
                                id="k-value"
                                icon="K"
                                value={reflectionAxis?.k || 0}
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    setReflectionAxis({
                                        ...reflectionAxis,
                                        k: isNaN(value) ? 0 : value
                                    });
                                }}
                                type="number"
                            />
                        )}

                        <GeoButton
                            variant="primary"
                            onClick={() => handleStartVisualization(TRANSFORMATION_TYPES.REFLECTION)}
                            className="w-full md:w-fit"
                        >
                            <Play/> Mulai Visualisasi
                        </GeoButton>
                    </div>
                </div>
            )
        }
    ], [visualizationType, translationValue, dilatationValue, rotationValue, reflectionAxis, shapePoints]);


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