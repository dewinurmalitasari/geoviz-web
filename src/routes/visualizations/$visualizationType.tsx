import {createFileRoute} from '@tanstack/react-router'
import PageHeader from "@/components/root/page-header.tsx";
import GeoCard from "@/components/geo/geo-card.tsx";
import GeoButton from "@/components/geo/geo-button.tsx";
import ShapePointsInput from "@/components/visualization/shape-points-input.tsx";
import {Play, SquareKanban} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {
    type DilatationValue,
    type PerformanceStats,
    type PlotlyData,
    type PlotlyLayout,
    type Point,
    type Point3D,
    type ReflectionValue,
    type RotationValue,
    type Transformation,
    TRANSFORMATION_TYPES,
    type TranslationValue,
    VISUALIZATION_TYPES
} from "@/type.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import GeoTabs from "@/components/geo/geo-tabs.tsx";
import {useVisualizationTabs} from "@/components/visualization/visualization-tabs.tsx";
import {calculateRange} from "@/hooks/use-calculate-range.ts";
import {PRESET_POINTS} from "@/lib/shape-preset.ts";
import {get3DAxisTraces, get3DShapePlotData, get3DShapePlotLayout} from "@/hooks/use-3d-plot.ts";
import {useIsMobile} from "@/hooks/use-mobile.ts";
import EquationInput, {type EquationState} from "@/components/visualization/equation-input.tsx";
import {
    get2DEquationPlotData,
    get2DEquationPlotLayout,
    getImplicitPlotData,
    getParametricPlotData,
    getPolarPlotData
} from "@/hooks/use-equation-plot.ts";
import {get2DShapePlotData, get2DShapePlotLayout} from "@/hooks/use-2d-plot.ts";
import PlotContainer from "@/components/plot/PlotContainer.tsx";
import AOS from 'aos';
import TransformationListPopover from "@/components/visualization/transformation-list-popover.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {usePlotlyAnimation} from "@/hooks/use-plotly-animations.ts";

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

    const [transformations, setTransformations] = useState<Transformation[]>([{
        type: TRANSFORMATION_TYPES.TRANSLATION,
        value: {
            translateX: 3,
            translateY: 3,
            ...(visualizationType === VISUALIZATION_TYPES.SHAPE_3D ? {translateZ: 3} : {})
        }
    }])
    const [transformationLoading, setTransformationLoading] = useState(false);

    const [plotData, setPlotData] = useState<PlotlyData>([])
    const [plotLayout, setPlotLayout] = useState<PlotlyLayout>({})

    const [perfStats, setPerfStats] = useState<PerformanceStats | null>(null);
    const initialRenderStartRef = useRef(0);
    const animationRenderStartRef = useRef(0);

    const {startAnimation} = usePlotlyAnimation({
        visualizationType,
        isMobile,
        setPlotData,
        setPlotLayout,
        onFrameTick: (stats) => {
            setPerfStats(stats);
        },
        renderStartRef: animationRenderStartRef,
    });

    const handlePlotClick = (points: Point[], equations: EquationState) => {
        if (visualizationType === VISUALIZATION_TYPES.EQUATION) {
            // For equation visualization
            const xRange: [number, number] = [-10, 10];
            const yRange: [number, number] = [-10, 10];

            let newPlotData: any = [];
            let newPlotLayout: any = get2DEquationPlotLayout(xRange, yRange);

            switch (equations.type) {
                case 'explicit':
                    newPlotData = get2DEquationPlotData(equations.equations, [-100, 100]); // Wide x-range for better visibility
                    break;

                case 'parametric':
                    // Define a default t-range (can be made configurable later)
                    const tRange: [number, number] = [-100, 100]; // Wide t-range for better visibility
                    const data = getParametricPlotData(equations.x, equations.y, tRange);
                    if (data) newPlotData = [data];
                    // Force 1:1 aspect ratio
                    newPlotLayout.yaxis.scaleanchor = 'x';
                    break;

                case 'polar':
                    // Define a default theta-range
                    const thetaRange: [number, number] = [0, 4 * Math.PI]; // 0 to 4π for better visibility
                    const polarData = getPolarPlotData(equations.r, thetaRange);
                    if (polarData) newPlotData = [polarData];
                    // Force 1:1 aspect ratio
                    newPlotLayout.yaxis.scaleanchor = 'x';
                    break;

                case 'implicit':
                    const implicitData = getImplicitPlotData(equations.fxy, [-100, 100], [-100, 100]);
                    if (implicitData) newPlotData = [implicitData];
                    // Force 1:1 aspect ratio
                    newPlotLayout.yaxis.scaleanchor = 'x';
                    break;
            }

            setPlotData(newPlotData)
            setPlotLayout(newPlotLayout)
        } else if (visualizationType === VISUALIZATION_TYPES.SHAPE_3D) {
            // For 3D visualization
            const {xRange, yRange, zRange} = calculateRange(points)
            const newPlotData = get3DShapePlotData(points as Point3D[])
            const newPlotLayout = get3DShapePlotLayout(xRange, yRange, zRange!)
            const axisTrace = get3DAxisTraces(xRange, yRange, zRange!)

            setPlotData([...newPlotData, ...axisTrace])
            setPlotLayout(newPlotLayout)
        } else {
            // For 2D visualization
            const {xRange, yRange} = calculateRange(points)
            const newPlotData = get2DShapePlotData(points)
            const newPlotLayout = get2DShapePlotLayout(xRange, yRange)
            setPlotData(newPlotData)
            setPlotLayout(newPlotLayout)
        }

        initialRenderStartRef.current = performance.now();
    }

    // Initialize plot on component mount
    useEffect(() => {
        handlePlotClick(shapePoints, equations)
    }, []) // Empty dependency array to run only on mount

    const executeTransformation = async (index: number, currentPoints: Point[]) => {
        if (index >= transformations.length) {
            setTransformationLoading(false);
            return;
        }

        const transformation = transformations[index];
        const transformationValues = {
            translationValue: transformations.find(t => t.type === TRANSFORMATION_TYPES.TRANSLATION)?.value as TranslationValue || {
                translateX: 0,
                translateY: 0,
                translateZ: 0
            },
            dilatationValue: transformations.find(t => t.type === TRANSFORMATION_TYPES.DILATATION)?.value as DilatationValue || {scaleFactor: 1},
            rotationValue: transformations.find(t => t.type === TRANSFORMATION_TYPES.ROTATION)?.value as RotationValue || {angle: 0},
            reflectionAxis: transformations.find(t => t.type === TRANSFORMATION_TYPES.REFLECTION)?.value as ReflectionValue || {axis: 'x-axis'},
        };

        startAnimation(
            transformation.type as 'translation' | 'dilatation' | 'rotation' | 'reflection',
            currentPoints,
            transformationValues,
            async (transformedPoints) => {
                // Add a delay before proceeding to the next transformation
                await new Promise(resolve => setTimeout(resolve, 500));
                executeTransformation(index + 1, transformedPoints);
            },
            shapePoints
        );
    };

    const handleStartVisualization = async () => {
        if (transformations.length === 0) return;

        setTransformationLoading(true);

        // Start with the first transformation
        await executeTransformation(0, shapePoints);
    };

    // Add visualizationType to the dependency to re-initialize when route changes
    useEffect(() => {
        const defaultKey = visualizationType === VISUALIZATION_TYPES.SHAPE_3D ? "cube" : "square";
        const newShapePoints = PRESET_POINTS[defaultKey] || [];
        setShapePoints(newShapePoints);

        // Reset transformation values
        setTransformations([{
            type: TRANSFORMATION_TYPES.TRANSLATION,
            value: {
                translateX: 3,
                translateY: 3,
                ...(visualizationType === VISUALIZATION_TYPES.SHAPE_3D ? {translateZ: 3} : {})
            }
        }]);

        // Reset equations for equation visualization
        setEquations({
            type: 'explicit',
            equations: ['x^2']
        });

        handlePlotClick(newShapePoints, equations);
    }, [visualizationType])

    useEffect(() => {
        // Force AOS to refresh and animate elements immediately when route changes
        const timer = setTimeout(() => {
            AOS.refresh();
            AOS.refreshHard();

            const aosElements = document.querySelectorAll('[data-aos]');
            aosElements.forEach(el => {
                el.classList.add('aos-animate');
            });
        }, 50); // Small delay to ensure DOM is ready

        return () => clearTimeout(timer);
    }, [visualizationType]);

    const tabs = useVisualizationTabs({
        visualizationType,
        setTransformations: setTransformations,
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
                            <PlotContainer
                                shapePoints={shapePoints}
                                plotData={plotData || []}
                                plotLayout={plotLayout}
                                perfStats={perfStats!!}
                                initialRenderStartRef={initialRenderStartRef}
                                animationRenderStartRef={animationRenderStartRef}
                            />

                            {/*Transformation Input and Play*/}
                            {visualizationType !== VISUALIZATION_TYPES.EQUATION &&
                                <div className="flex flex-col space-y-4">
                                    <div
                                        className="flex flex-col-reverse gap-y-2 md:flex-row md:space-y-0 md:space-x-4 items-center justify-center">
                                        <TransformationListPopover
                                            transformations={transformations}
                                            onTransformationsChange={setTransformations}
                                            colorScheme="purple"
                                            isLoading={transformationLoading}
                                            className="flex-4"
                                        />

                                        <GeoButton
                                            variant="primary"
                                            onClick={handleStartVisualization}
                                            isLoading={transformationLoading}
                                            className="flex-1"
                                        >
                                            <Play/> Mulai Visualisasi
                                        </GeoButton>

                                        {/*TODO: Add a button to proceed step manually*/}
                                    </div>

                                    <Separator className="text-deep-purple-500"/>

                                    <GeoTabs
                                        defaultValue="translation"
                                        tabs={tabs}
                                        variant="pills"
                                        fullWidth={true}
                                        className="flex-1"
                                    />
                                </div>
                            }
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
                                    maxPoints={12}
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