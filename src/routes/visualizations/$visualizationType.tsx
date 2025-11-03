// $visualizationType.tsx (updated)
import {createFileRoute} from '@tanstack/react-router'
import PageHeader from "@/components/root/page-header.tsx";
import GeoCard from "@/components/geo/geo-card.tsx";
import GeoButton from "@/components/geo/geo-button.tsx";
import ShapePointsInput, {type Point} from "@/components/visualization/shape-points-input.tsx";
import {toast} from "sonner";
import {Play, SquareKanban} from "lucide-react";
import {useState} from "react";

export const Route = createFileRoute('/visualizations/$visualizationType')({
    component: RouteComponent,
})

function RouteComponent() {
    const {visualizationType} = Route.useParams()
    const [shapePoints, setShapePoints] = useState<Point[]>([])

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
                        {/* Visualization Canvas Area TODO: */}
                        <div
                            className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 flex-1 min-h-[400px] flex items-center justify-center">
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

                        {/* Controls Panel */}
                        <div className="flex flex-col space-y-6 flex-1">
                            <div className="flex flex-col space-y-2">
                                <GeoButton
                                    variant="primary"
                                    onClick={handleStartVisualization}
                                    className="h-fit"
                                >
                                    <Play/> Mulai Visualisasi
                                </GeoButton>

                                <GeoButton
                                    variant="secondary"
                                    onClick={() => handlePlotClick(shapePoints)}
                                    className="h-fit"
                                >
                                    <SquareKanban/> Plot Titik
                                </GeoButton>
                            </div>

                            {/* Shape Points Input */}
                            <ShapePointsInput
                                onPointsChange={(points) => setShapePoints(points)}
                                dimension="2d"
                                initialPoints={[
                                    {x: 0, y: 0},
                                    {x: 50, y: 0},
                                    {x: 25, y: 50}
                                ]}
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