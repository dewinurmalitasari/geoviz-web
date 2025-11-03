// $visualizationType.tsx (updated)
import {createFileRoute} from '@tanstack/react-router'
import PageHeader from "@/components/root/page-header.tsx";
import GeoCard from "@/components/geo/geo-card.tsx";
import GeoButton from "@/components/geo/geo-button.tsx";
import ShapePointsInput from "@/components/visualization/shape-points-input.tsx";
import {toast} from "sonner";
import {Play, Settings, SquareKanban, User} from "lucide-react";
import {useState} from "react";
import type {Point} from "@/type.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import GeoTabs from "@/components/geo/geo-tabs.tsx";

export const Route = createFileRoute('/visualizations/$visualizationType')({
    beforeLoad: ({params}) => {
        // If not in list of available visualizations, return not found
        const availableVisualizations = [
            'shape2d',
            'shape3d',
            'equation',
        ];

        if (!availableVisualizations.includes(params.visualizationType as string)) {
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

    const tabs = [
        {
            value: "profile",
            label: "Profile",
            icon: <User size={16}/>,
            content: (
                <div className="p-4  rounded-lg border border-deep-purple-200">
                    <h3 className="text-lg font-semibold">Profile Information</h3>
                    <p>Manage your profile settings</p>
                </div>
            )
        },
        {
            value: "settings",
            label: "Settings",
            icon: <Settings size={16}/>,
            content: (
                <div className="p-4  rounded-lg border border-deep-purple-200">
                    <h3 className="text-lg font-semibold">Account Settings</h3>
                    <p>Configure your preferences</p>
                </div>
            )
        },
        {
            value: "settings1",
            label: "Setting1",
            icon: <Settings size={16}/>,
            content: (
                <div className="p-4  rounded-lg border border-deep-purple-200">
                    <h3 className="text-lg font-semibold">Account Settings</h3>
                    <p>Configure your preferences</p>
                </div>
            )
        },
        {
            value: "settings2",
            label: "Settings2",
            icon: <Settings size={16}/>,
            content: (
                <div className="p-4  rounded-lg border border-deep-purple-200">
                    <h3 className="text-lg font-semibold">Account Settings</h3>
                    <p>Configure your preferences</p>
                </div>
            )
        }
    ];

    const handlePlotClick = (points: Point[]) => {
        if (points.length < 3) {
            toast.error("Minimal 3 titik diperlukan untuk membuat bangun")
            return
        }

        toast.success(`Plotting ${points.length} titik...`)
        console.log("Plotting points:", points)
        // Here you would typically send the points to your visualization engine
    }

    const handleStartVisualization = () => {
        if (shapePoints.length < 3) {
            toast.error("Tambahkan minimal 3 titik terlebih dahulu")
            return
        }

        toast.success("Memulai visualisasi...")
        console.log("Starting visualization with points:", shapePoints)
        // Start your visualization logic here
    }

    return (
        <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
            <PageHeader
                title={`Visualisasi ${visualizationType.translateVisualizationType()}`}
                description={`Visualisasi transformasi geometri pada ${visualizationType.translateVisualizationType().toLowerCase()}.`}
                colorScheme="orange"
            />

            <GeoCard
                content={
                    <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">

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

                            {/*Transformation Input*/}
                            <div className="flex flex-col space-y-6 flex-1">
                                <GeoButton
                                    variant="primary"
                                    onClick={handleStartVisualization}
                                    className="h-fit"
                                >
                                    <Play/> Mulai Visualisasi
                                </GeoButton>

                                <GeoTabs
                                    defaultValue="profile"
                                    tabs={tabs}
                                    colorScheme="purple"
                                    variant="pills"
                                    fullWidth={true}
                                />
                            </div>
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
                                dimension={visualizationType === 'shape3d' ? '3d' : '2d'}
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