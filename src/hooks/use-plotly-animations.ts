import {useCallback, useEffect, useRef} from 'react';
import {
    type DilatationValue,
    type Point,
    type Point2D,
    type Point3D,
    type ReflectionValue,
    type RotationValue,
    type TranslationValue,
    TRANSFORMATION_TYPES,
    VISUALIZATION_TYPES
} from '@/type.ts';
import {calculateRange} from '@/hooks/use-calculate-range.ts';
import {get2DShapePlotData, get2DShapePlotLayout} from '@/hooks/use-2d-plot.ts';
import {get3DShapePlotData, get3DShapePlotLayout} from '@/hooks/use-3d-plot.ts';
import {
    calculate3DTransformedCoordinates,
    calculate2DTransformedCoordinates
} from '@/hooks/use-calculate-transformation.ts';

type PlotlyTrace = Record<string, any>;
type PlotlyData = PlotlyTrace[];
type PlotlyLayout = Record<string, any>;

type TransformationType = (typeof TRANSFORMATION_TYPES)[keyof typeof TRANSFORMATION_TYPES];

interface UsePlotlyAnimationProps {
    shapePoints: Point[];
    visualizationType: string;
    isMobile: boolean;
    transformationValues: {
        translationValue: TranslationValue;
        dilatationValue: DilatationValue;
        rotationValue: RotationValue;
        reflectionAxis: ReflectionValue;
    };
    setPlotData: React.Dispatch<React.SetStateAction<PlotlyData>>;
    setPlotLayout: React.Dispatch<React.SetStateAction<PlotlyLayout>>;
    setDilatationValue: React.Dispatch<React.SetStateAction<DilatationValue>>;
}

export function usePlotlyAnimation(
    {
        shapePoints,
        visualizationType,
        isMobile,
        transformationValues,
        setPlotData,
        setPlotLayout,
        setDilatationValue
    }: UsePlotlyAnimationProps) {

    const animationFrameRef = useRef<number | null>(null);

    const cancelAnimation = useCallback(() => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
    }, []);

    useEffect(() => {
        return () => {
            cancelAnimation();
        };
    }, [cancelAnimation]);

    const startAnimation = useCallback((transformationType: TransformationType) => {
        cancelAnimation();

        const {translationValue, dilatationValue, rotationValue, reflectionAxis} = transformationValues;

        const is3D = visualizationType === VISUALIZATION_TYPES.SHAPE_3D;

        let values: TranslationValue | DilatationValue | RotationValue | ReflectionValue;
        let transformedPoints: Point[];
        let originalTraces: PlotlyData;
        let transformedColor: string;

        let plotFn: (points: Point[], color: string) => PlotlyData;
        let transformationFn: (
            points: Point[],
            type: TransformationType,
            values: TranslationValue | DilatationValue | RotationValue | ReflectionValue
        ) => Point[];


        // 1. Set up variables based on 2D or 3D
        if (is3D) {
            // Assign 3D-specific functions
            plotFn = (points, color) => get3DShapePlotData(points as Point3D[], color);
            transformationFn = (points, type, values) =>
                calculate3DTransformedCoordinates(points as Point3D[], type as any, values);

            originalTraces = plotFn(shapePoints, 'cyan');
            transformedColor = 'orange';

            switch (transformationType) {
                case TRANSFORMATION_TYPES.TRANSLATION:
                    values = translationValue;
                    break;
                case TRANSFORMATION_TYPES.DILATATION:
                    values = dilatationValue.scaleFactor === 0 ? {...dilatationValue, scaleFactor: 1} : dilatationValue;
                    if (dilatationValue.scaleFactor === 0) setDilatationValue(values);
                    break;
                case TRANSFORMATION_TYPES.ROTATION:
                    values = rotationValue;
                    break;
                case TRANSFORMATION_TYPES.REFLECTION:
                    values = reflectionAxis;
                    break;
                default:
                    return;
            }
            transformedPoints = transformationFn(shapePoints, transformationType, values);
        } else {
            // Assign 2D-specific functions
            plotFn = (points, color) => get2DShapePlotData(points as Point2D[], isMobile, color, true);
            transformationFn = (points, type, values) =>
                calculate2DTransformedCoordinates(points as Point2D[], type as any, values);

            originalTraces = plotFn(shapePoints, 'blue');
            transformedColor = 'red';

            switch (transformationType) {
                case TRANSFORMATION_TYPES.TRANSLATION:
                    values = translationValue;
                    break;
                case TRANSFORMATION_TYPES.DILATATION:
                    values = dilatationValue.scaleFactor === 0 ? {...dilatationValue, scaleFactor: 1} : dilatationValue;
                    if (dilatationValue.scaleFactor === 0) setDilatationValue(values);
                    break;
                case TRANSFORMATION_TYPES.ROTATION:
                    values = rotationValue;
                    break;
                case TRANSFORMATION_TYPES.REFLECTION:
                    values = reflectionAxis;
                    break;
                default:
                    return;
            }
            transformedPoints = transformationFn(shapePoints, transformationType, values);
        }

        // 2. Calculate new layout to fit both shapes
        const allPoints = [...shapePoints, ...transformedPoints];
        const {xRange, yRange, zRange} = calculateRange(allPoints, transformedPoints, isMobile? (transformationType === 'dilatation'? 0.2 : 0.5) : 1);

        let newLayout: PlotlyLayout;

        let finalXRange = xRange;
        let finalYRange = yRange;
        let finalZRange = zRange;

        if (is3D) {
            const xSpan = xRange[1] - xRange[0];
            const ySpan = yRange[1] - yRange[0];
            const zSpan = zRange![1] - zRange![0];
            const maxSpan = Math.max(xSpan, ySpan, zSpan);

            const xCenter = (xRange[0] + xRange[1]) / 2;
            const yCenter = (yRange[0] + yRange[1]) / 2;
            const zCenter = (zRange![0] + zRange![1]) / 2;

            finalXRange = [xCenter - maxSpan / 2, xCenter + maxSpan / 2];
            finalYRange = [yCenter - maxSpan / 2, yCenter + maxSpan / 2];
            finalZRange = [zCenter - maxSpan / 2, zCenter + maxSpan / 2];

            newLayout = get3DShapePlotLayout(finalXRange, finalYRange, finalZRange);
        } else {
            newLayout = get2DShapePlotLayout(finalXRange, finalYRange);

            // Add reflection line trace for 2D plots
            if (transformationType === TRANSFORMATION_TYPES.REFLECTION) {
                const axis = (values as ReflectionValue).axis;
                const k = (values as ReflectionValue).k!;
                let lineTrace: Partial<PlotlyTrace> | null = null

                const lineRangeMultiplier = 2;
                const xLineRange = [xRange[0] * lineRangeMultiplier, xRange[1] * lineRangeMultiplier];
                const yLineRange = [yRange[0] * lineRangeMultiplier, yRange[1] * lineRangeMultiplier];

                switch (axis) {
                    case 'line-y-x':
                        lineTrace = {x: xLineRange, y: xLineRange};
                        break;
                    case 'line-y-neg-x':
                        lineTrace = {x: xLineRange, y: xLineRange.map(x => -x)};
                        break;
                    case 'line-y-k':
                        lineTrace = {x: xLineRange, y: [k, k]};
                        break;
                    case 'line-x-k':
                        lineTrace = {x: [k, k], y: yLineRange};
                        break;
                }

                if (lineTrace) {
                    originalTraces.push({
                        ...lineTrace,
                        mode: 'lines',
                        type: 'scatter',
                        line: {color: 'green'},
                        showlegend: false
                    } as PlotlyTrace); // Cast to full trace type
                }
            }
        }

        setPlotLayout(newLayout);

        // 3. Start Animation
        const startTime = performance.now();
        const duration = transformationType === TRANSFORMATION_TYPES.ROTATION ? 1500 : 1000;

        const animate = (timestamp: number) => {
            const elapsed = timestamp - startTime;
            let t = Math.min(elapsed / duration, 1);

            let intermediatePoints: Point[];

            if (transformationType === TRANSFORMATION_TYPES.ROTATION) {
                // Interpolate angle for rotation
                const startAngle = 0;
                const endAngle = (values as RotationValue).angle;
                const intermediateAngle = startAngle + (endAngle - startAngle) * t;
                const intermediateValues = {...values, angle: intermediateAngle};
                intermediatePoints = transformationFn(shapePoints, 'rotation', intermediateValues);
            } else {
                // Linear interpolation
                intermediatePoints = shapePoints.map((point, i) => {
                    const start = point;
                    const end = transformedPoints[i];

                    if (is3D) {
                        // We are 3D
                        const start3D = start as Point3D;
                        const end3D = end as Point3D;
                        return {
                            x: start3D.x + (end3D.x - start3D.x) * t,
                            y: start3D.y + (end3D.y - start3D.y) * t,
                            z: start3D.z + (end3D.z - start3D.z) * t,
                        } as Point3D;
                    } else {
                        // We are 2D
                        const start2D = start as Point2D;
                        const end2D = end as Point2D;
                        return {
                            x: start2D.x + (end2D.x - start2D.x) * t,
                            y: start2D.y + (end2D.y - start2D.y) * t,
                        } as Point2D;
                    }
                });
            }

            const intermediateTraces = plotFn(intermediatePoints, transformedColor);
            setPlotData([...originalTraces, ...intermediateTraces]);

            if (t < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
            } else {
                const finalTraces = plotFn(transformedPoints, transformedColor);
                setPlotData([...originalTraces, ...finalTraces]);
                animationFrameRef.current = null;
            }
        };

        animationFrameRef.current = requestAnimationFrame(animate);

    }, [
        shapePoints,
        transformationValues,
        visualizationType,
        isMobile,
        setPlotData,
        setPlotLayout,
        setDilatationValue,
        cancelAnimation
    ]);

    return {startAnimation};
}