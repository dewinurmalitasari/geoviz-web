import PageHeader from "@/components/root/page-header.tsx";
import {useIsMobile} from "@/hooks/use-mobile.ts";
import {useEffect, useRef, useState} from "react";
import {
    type DilatationValue,
    type PerformanceStats,
    type PlotlyData,
    type PlotlyLayout,
    type Point,
    type ReflectionValue,
    type RotationValue,
    TRANSFORMATION_TYPES,
    type TranslationValue,
    VISUALIZATION_TYPES,
} from "@/type.ts";
import {usePlotlyAnimation} from "@/hooks/use-plotly-animations.ts";
import GeoCard from "@/components/geo/geo-card.tsx";
import PlotContainer from "@/components/plot/PlotContainer.tsx";
import GeoButton from "@/components/geo/geo-button.tsx";
import {RotateCcw} from "lucide-react";
import {useGeneratePracticeShape, useGeneratePracticeTypeAndValue} from "@/hooks/use-generate-practice.ts";
import {calculateRange} from "@/hooks/use-calculate-range.ts";
import {get2DShapePlotData, get2DShapePlotLayout} from "@/hooks/use-2d-plot.ts";

export default function IdentifyPractice() {
    const isMobile = useIsMobile();
    const [shapePoints, setShapePoints] = useState<Point[]>([])

    const [transformationType, setTransformationType] = useState<string>('')
    const [translationValue, setTranslationValue] = useState<TranslationValue>({translateX: 0, translateY: 0})
    const [dilatationValue, setDilatationValue] = useState<DilatationValue>({scaleFactor: 1})
    const [rotationValue, setRotationValue] = useState<RotationValue>({angle: 0})
    const [reflectionAxis, setReflectionAxis] = useState<ReflectionValue>({axis: 'origin', k: 0})

    const [plotData, setPlotData] = useState<PlotlyData>([])
    const [plotLayout, setPlotLayout] = useState<PlotlyLayout>({})

    const [perfStats, setPerfStats] = useState<PerformanceStats | null>(null);
    const initialRenderStartRef = useRef(0);
    const animationRenderStartRef = useRef(0);

    const visualizationType = VISUALIZATION_TYPES.SHAPE_2D
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
        setDilatationValue,
        onFrameTick: (stats) => {
            setPerfStats(stats);
        },
        renderStartRef: animationRenderStartRef,
    });

    const {generateTransformationType, generateTransformationValue} = useGeneratePracticeTypeAndValue()
    const {generateRandomShape} = useGeneratePracticeShape()

    const handleGenerate = () => {
        const type = generateTransformationType()
        setTransformationType(type)
        const value = generateTransformationValue(type)
        switch (type) {
            case TRANSFORMATION_TYPES.TRANSLATION:
                setTranslationValue(value as TranslationValue)
                break
            case TRANSFORMATION_TYPES.DILATATION:
                setDilatationValue(value as DilatationValue)
                break
            case TRANSFORMATION_TYPES.ROTATION:
                setRotationValue(value as RotationValue)
                break
            case TRANSFORMATION_TYPES.REFLECTION:
                setReflectionAxis(value as ReflectionValue)
                break
        }

        const points = generateRandomShape().points
        setShapePoints(points)

        const {xRange, yRange} = calculateRange(points)
        const newPlotData = get2DShapePlotData(points, isMobile)
        const newPlotLayout = get2DShapePlotLayout(xRange, yRange)
        setPlotData(newPlotData)
        setPlotLayout(newPlotLayout)
    }

    // TODO: Remove this useEffect and use start
    useEffect(() => {
        handleGenerate()
    }, [])

    useEffect(() => {
        console.log(shapePoints, transformationType, translationValue, dilatationValue, rotationValue, reflectionAxis)

        if (transformationType && shapePoints.length > 0) {
            startAnimation(transformationType as 'translation' | 'dilatation' | 'rotation' | 'reflection');
        }
    }, [transformationType, shapePoints])


    return (
        <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
            <PageHeader
                title="Latihan Identifikasi Jenis Transformasi"
                description="Latihan untuk mengidentifikasi jenis transformasi geometri."
                colorScheme="blue"
            />

            <GeoCard
                content={
                    <div className="flex flex-col xl:flex-row xl:space-x-6 space-y-6 xl:space-y-0">
                        <PlotContainer
                            shapePoints={shapePoints}
                            plotData={plotData || []}
                            plotLayout={plotLayout}
                            perfStats={perfStats!!}
                            initialRenderStartRef={initialRenderStartRef}
                            animationRenderStartRef={animationRenderStartRef}
                        />


                        <div className="flex flex-col space-y-4 flex-1">
                            <GeoButton
                                variant="secondary"
                                onClick={() => startAnimation(transformationType as 'translation' | 'dilatation' | 'rotation' | 'reflection')} // TODO: Update transformation type dynamically
                                className="h-fit"
                            >
                                <RotateCcw/> Ulangi AnimasI
                            </GeoButton>


                        </div>
                    </div>
                }
            />
        </div>
    );
}