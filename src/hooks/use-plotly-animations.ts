import {useCallback, useEffect, useRef} from 'react';
import {
    type DilatationValue, type PerformanceStats, type PlotlyData, type PlotlyLayout, type PlotlyTrace,
    type Point,
    type Point2D,
    type Point3D,
    type ReflectionValue,
    type RotationValue,
    TRANSFORMATION_TYPES,
    type TranslationValue,
    VISUALIZATION_TYPES
} from '@/type.ts';
import {calculateRange} from '@/hooks/use-calculate-range.ts';
import {get2DShapePlotData, get2DShapePlotLayout} from '@/hooks/use-2d-plot.ts';
import {get3DAxisTraces, get3DShapePlotData, get3DShapePlotLayout} from '@/hooks/use-3d-plot.ts';
import {
    calculate2DTransformedCoordinates,
    calculate3DTransformedCoordinates
} from '@/hooks/use-calculate-transformation.ts';


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
    setPlotData: (data: PlotlyData) => void;
    setPlotLayout: (layout: PlotlyLayout) => void;
    setDilatationValue: (a: DilatationValue) => void;
    onFrameTick: (stats: PerformanceStats | null) => void;
    renderStartRef: React.MutableRefObject<number>;
    targetFps?: number;
}

export function usePlotlyAnimation(
    {
        shapePoints,
        visualizationType,
        isMobile,
        transformationValues,
        setPlotData,
        setPlotLayout,
        setDilatationValue,
        onFrameTick,
        renderStartRef,
        targetFps = 30
    }: UsePlotlyAnimationProps) {

    const animationFrameRef = useRef<number | null>(null);
    const isAnimatingRef = useRef(false); // Track animation state outside React state

    const lastFrameTimeRef = useRef(performance.now());
    const lastStatUpdateTimeRef = useRef(0);

    const cancelAnimation = useCallback(() => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
        isAnimatingRef.current = false;
        onFrameTick(null);
    }, []);

    useEffect(() => {
        return () => {
            cancelAnimation();
        };
    }, [cancelAnimation]);

    const startAnimation = useCallback((transformationType: TransformationType) => {
        if (isAnimatingRef.current) {
            cancelAnimation(); // Cancel any ongoing animation
        }

        isAnimatingRef.current = true; // Mark that an animation is starting

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
                    isAnimatingRef.current = false;
                    return;
            }
            transformedPoints = transformationFn(shapePoints, transformationType, values);
        } else {
            plotFn = (points, color) => get2DShapePlotData(points as Point2D[], isMobile, color);
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
                    isAnimatingRef.current = false;
                    return;
            }
            transformedPoints = transformationFn(shapePoints, transformationType, values);
        }

        // 2. Calculate new layout to fit both shapes (only once, before animation)
        const allPoints = [...shapePoints, ...transformedPoints];
        const {
            xRange,
            yRange,
            zRange
        } = calculateRange(allPoints, transformedPoints, isMobile ? (transformationType === 'dilatation' ? 0.2 : 0.5) : 1);

        let newLayout: PlotlyLayout;

        let finalXRange = xRange;
        let finalYRange = yRange;
        let finalZRange = zRange;
        let axisTraces: PlotlyData = [];

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

            axisTraces = get3DAxisTraces(finalXRange, finalYRange, finalZRange as [number, number]);
        } else {
            newLayout = get2DShapePlotLayout(finalXRange, finalYRange);

            if (transformationType === TRANSFORMATION_TYPES.REFLECTION) {
                const axis = (values as ReflectionValue).axis;
                const k = (values as ReflectionValue).k!;
                let lineTrace: Partial<PlotlyTrace> | null = null

                const lineRangeMultiplier = 10;
                const xLineRange = [-xRange[1] * lineRangeMultiplier, xRange[1] * lineRangeMultiplier];
                const yLineRange = [-yRange[1] * lineRangeMultiplier, yRange[1] * lineRangeMultiplier];

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
                        type: 'scattergl',
                        line: {color: 'green'},
                        showlegend: false
                    } as PlotlyTrace);
                }
            }
        }

        // Set the layout only once before the animation starts
        setPlotLayout(newLayout);

        // 3. Precompute deltas for performance
        const deltas = shapePoints.map((point, i) => {
            const start = point;
            const end = transformedPoints[i];

            if (is3D) {
                const start3D = start as Point3D;
                const end3D = end as Point3D;
                return {
                    x: end3D.x - start3D.x,
                    y: end3D.y - start3D.y,
                    z: end3D.z - start3D.z,
                } as Point3D;
            } else {
                const start2D = start as Point2D;
                const end2D = end as Point2D;
                return {
                    x: end2D.x - start2D.x,
                    y: end2D.y - start2D.y,
                } as Point2D;
            }
        });

        // 4. Start Animation
        const startTime = performance.now();
        const duration = transformationType === TRANSFORMATION_TYPES.ROTATION ? 1500 : 1000;

        lastFrameTimeRef.current = performance.now();
        lastStatUpdateTimeRef.current = 0;

        const animate = (timestamp: number) => {
            if (!isAnimatingRef.current) return; // Early return if animation was cancelled

            const now = performance.now();
            const frameTime = now - lastFrameTimeRef.current;
            const targetFrameTime = 10 / targetFps; // Aim for slightly higher than target FPS

            // Throttle FPS - skip frame if we're rendering too fast
            if (frameTime < targetFrameTime) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            const fps = 1000 / frameTime;
            lastFrameTimeRef.current = now;

            const calcStartTime = performance.now();

            const elapsed = timestamp - startTime;
            let t = Math.min(elapsed / duration, 1);

            let intermediatePoints: Point[];

            if (transformationType === TRANSFORMATION_TYPES.ROTATION) {
                const startAngle = 0;
                const endAngle = (values as RotationValue).angle;
                const intermediateAngle = startAngle + (endAngle - startAngle) * t;
                const intermediateValues = {...values, angle: intermediateAngle};
                intermediatePoints = transformationFn(shapePoints, 'rotation', intermediateValues);
            } else {
                // Use precomputed deltas for better performance
                intermediatePoints = shapePoints.map((point, i) => {
                    const delta = deltas[i];

                    if (is3D) {
                        const point3D = point as Point3D;
                        const delta3D = delta as Point3D;
                        return {
                            x: point3D.x + delta3D.x * t,
                            y: point3D.y + delta3D.y * t,
                            z: point3D.z + delta3D.z * t,
                        } as Point3D;
                    } else {
                        const point2D = point as Point2D;
                        const delta2D = delta as Point2D;
                        return {
                            x: point2D.x + delta2D.x * t,
                            y: point2D.y + delta2D.y * t,
                        } as Point2D;
                    }
                });
            }

            const intermediateTraces = plotFn(intermediatePoints, transformedColor);
            const calcTime = performance.now() - calcStartTime;
            renderStartRef.current = performance.now();

            // Batch the state update to avoid multiple renders
            setPlotData([...axisTraces, ...originalTraces, ...intermediateTraces]);

            if (now - lastStatUpdateTimeRef.current > 100) {
                onFrameTick({frameTime, fps, calcTime});
                lastStatUpdateTimeRef.current = now;
            }

            if (t < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
            } else {
                // Final update
                const finalTraces = plotFn(transformedPoints, transformedColor);
                setPlotData([...axisTraces, ...originalTraces, ...finalTraces]);
                animationFrameRef.current = null;
                isAnimatingRef.current = false;
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
        cancelAnimation,
        onFrameTick,
        renderStartRef,
        targetFps
    ]);

    return {startAnimation, cancelAnimation};
}