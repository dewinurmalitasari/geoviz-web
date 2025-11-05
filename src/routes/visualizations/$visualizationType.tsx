import {createFileRoute} from '@tanstack/react-router'
import PageHeader from "@/components/root/page-header.tsx";
import GeoCard from "@/components/geo/geo-card.tsx";
import GeoButton from "@/components/geo/geo-button.tsx";
import ShapePointsInput from "@/components/visualization/shape-points-input.tsx";
import {SquareKanban} from "lucide-react";
import {useEffect, useState} from "react";
import {
    type DilatationValue,
    type Point,
    type Point3D,
    type ReflectionValue,
    type RotationValue,
    type TranslationValue,
    VISUALIZATION_TYPES
} from "@/type.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import GeoTabs from "@/components/geo/geo-tabs.tsx";
import {useVisualizationTabs} from "@/components/visualization/visualization-tabs.tsx";
import Plot from "react-plotly.js";
import {calculateRange} from "@/hooks/use-calculate-range.ts";
import {PRESET_POINTS} from "@/lib/shape-preset.ts";
import {get3DAxisTraces, get3DShapePlotData, get3DShapePlotLayout} from "@/hooks/use-3d-plot.ts";
import {useIsMobile} from "@/hooks/use-mobile.ts";
import {usePlotlyAnimation} from "@/hooks/use-plotly-animations.ts";
import EquationInput, {type EquationState} from "@/components/visualization/equation-input.tsx";
import {
    get2DEquationPlotData,
    get2DEquationPlotLayout,
    getImplicitPlotData,
    getParametricPlotData,
    getPolarPlotData
} from "@/hooks/use-equation-plot.ts";

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
                title="Terjadi Kesalahan memuat visualisasi"
                message={error.message || "Gagal memuat visualisasi."}
            />
        );
    },
})

function RouteComponent() {
    const {visualizationType} = Route.useParams()
    const isMobile = useIsMobile();
    const [shapePoints, setShapePoints] = useState<Point[]>(() => {
        const defaultKey = visualizationType === VISUALIZATION_TYPES.SHAPE_3D ? "cube" : "square";
        return PRESET_POINTS[defaultKey] || [];
    })
    const [equations, setEquations] = useState<EquationState>({
        type: 'explicit',
        equations: ['x^2']
    });

    const [translationValue, setTranslationValue] = useState<TranslationValue>({
        translateX: 3,
        translateY: 3,
        translateZ: 3
    })
    const [dilatationValue, setDilatationValue] = useState<DilatationValue>({scaleFactor: 4,})
    const [rotationValue, setRotationValue] = useState<RotationValue>({angle: 90, axis: 'radio_x_axis'})
    const [reflectionAxis, setReflectionAxis] = useState<ReflectionValue>({
        axis: visualizationType === VISUALIZATION_TYPES.SHAPE_3D ? 'radio-xy-plane' : 'y-axis',
        k: 0
    })

    const [plotData, setPlotData] = useState<any>()
    const [plotLayout, setPlotLayout] = useState<any>(null)

    const {startAnimation} = usePlotlyAnimation({
        shapePoints,
        visualizationType,
        isMobile,
        transformationValues: {
            translationValue,
            dilatationValue,
            rotationValue,
            reflectionAxis
        },
        setPlotData,
        setPlotLayout,
        setDilatationValue
    });

    const handlePlotClick = (points: Point[], equations: EquationState) => {
        if (visualizationType === VISUALIZATION_TYPES.EQUATION) {
            // For equation visualization
            const xRange: [number, number] = [-10, 10];
            const yRange: [number, number] = [-10, 10];

            let newPlotData: any = [];
            // Start with the base layout
            let newPlotLayout: any = get2DEquationPlotLayout(xRange, yRange);

            // Call the correct plot function based on the state type
            switch (equations.type) {
                case 'explicit':
                    newPlotData = get2DEquationPlotData(equations.equations, xRange);
                    // Standard layout is fine
                    break;

                case 'parametric':
                    // Define a default t-range (can be made configurable later)
                    const tRange: [number, number] = [-10, 10];
                    const data = getParametricPlotData(equations.x, equations.y, tRange);
                    if (data) newPlotData = [data];
                    // Force 1:1 aspect ratio
                    newPlotLayout.yaxis.scaleanchor = 'x';
                    break;

                case 'polar':
                    // Define a default theta-range
                    const thetaRange: [number, number] = [0, 2 * Math.PI];
                    const polarData = getPolarPlotData(equations.r, thetaRange);
                    if (polarData) newPlotData = [polarData];
                    // Force 1:1 aspect ratio
                    newPlotLayout.yaxis.scaleanchor = 'x';
                    break;

                case 'implicit':
                    const implicitData = getImplicitPlotData(equations.fxy, xRange, yRange);
                    if (implicitData) newPlotData = [implicitData];
                    // Force 1:1 aspect ratio
                    newPlotLayout.yaxis.scaleanchor = 'x';
                    break;
            }

            setPlotData(newPlotData)
            setPlotLayout(newPlotLayout)
        } else {
            // For 3D visualization
            const {xRange, yRange, zRange} = calculateRange(points as Point3D[])
            const newPlotData = get3DShapePlotData(points as Point3D[])
            const newPlotLayout = get3DShapePlotLayout(xRange, yRange, zRange!)
            const axisTrace = get3DAxisTraces(xRange, yRange, zRange!)

            setPlotData([...newPlotData, ...axisTrace])
            setPlotLayout(newPlotLayout)
        }
    }

    // Initialize plot on component mount
    useEffect(() => {
        handlePlotClick(shapePoints, equations)
    }, []) // Empty dependency array to run only on mount

    const handleStartVisualization = (transformationType: string) => {
        // Dilatation divide by zero check
        if (transformationType === 'dilatation' && dilatationValue.scaleFactor === 0) {
            setDilatationValue(
                {...dilatationValue, scaleFactor: 1}
            )
            dilatationValue.scaleFactor = 1
        }

        startAnimation(transformationType as 'translation' | 'dilatation' | 'rotation' | 'reflection');
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
        onStartVisualization: handleStartVisualization
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
                            <div
                                className="flex-5 bg-gradient-to-br from-deep-purple-100 to-deep-purple-200  rounded-xl p-4 flex items-center justify-center">
                                {shapePoints.length > 0 ? (
                                    <Plot
                                        data={plotData}
                                        layout={plotLayout}
                                        // config={{responsive: true}} // INFO: Uncomment this line to make the plot responsive, but will make weird bug when on mobile
                                        className="h-full md:h-[80vh] w-full"
                                    />
                                ) : (
                                    <div className="text-center text-gray-500 dark:text-gray-400">
                                        <div className="text-lg font-semibold mb-2">Area Visualisasi</div>
                                        <div className="text-sm">Tambahkan titik untuk memulai visualisasi</div>
                                    </div>
                                )}
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
                                onClick={() => handlePlotClick(shapePoints, equations)}
                                className="h-fit"
                            >
                                <SquareKanban/> Plot Titik
                            </GeoButton>

                            {/* Shape Points Input */}
                            {visualizationType !== VISUALIZATION_TYPES.EQUATION &&
                                <ShapePointsInput
                                    onPointsChange={(points) => setShapePoints(points)}
                                    dimension={visualizationType === VISUALIZATION_TYPES.SHAPE_3D ? "3d" : "2d"}
                                    maxPoints={8}
                                    minPoints={3}
                                    defaultPoints={shapePoints}
                                    className="p-4 rounded-xl border border-deep-purple-200"
                                />
                            }

                            {/* Equation Input*/}
                            {visualizationType === VISUALIZATION_TYPES.EQUATION &&
                                <EquationInput
                                    equationState={equations}
                                    onEquationStateChange={(newState: EquationState) => setEquations(newState)}
                                    maxEquations={5}
                                    minEquations={1}
                                    className="p-4 rounded-xl border border-deep-purple-200"
                                />
                            }
                        </div>
                    </div>
                }
            />
        </div>
    )
}