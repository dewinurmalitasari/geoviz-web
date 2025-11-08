import Plot from "react-plotly.js";
import type {PerformanceStats, PlotlyData, PlotlyLayout, Point} from "@/type.ts";
import {useState} from "react";

interface PlotContainerProps {
    shapePoints: Point[];
    plotData: PlotlyData;
    plotLayout: PlotlyLayout;
    perfStats: PerformanceStats
    initialRenderStartRef: React.MutableRefObject<number>;
    animationRenderStartRef: React.MutableRefObject<number>;
}

export default function PlotContainer(
    {
        shapePoints,
        plotData,
        plotLayout,
        perfStats,
        initialRenderStartRef,
        animationRenderStartRef
    }: PlotContainerProps) {
    const [animationRenderTime, setAnimationRenderTime] = useState<number>(0);
    const [initialRenderTime, setInitialRenderTime] = useState<number>(0);

    return (
        <div
            className="flex-5 bg-gradient-to-br from-deep-purple-100 to-deep-purple-200  rounded-xl p-2 md:p-4 flex items-center justify-center">
            {shapePoints.length > 0 ? (
                <div className="flex flex-col w-full h-full">
                    {/*TODO: Hide this somewhere*/}
                    {/* Performance Stats */}
                    {(initialRenderTime > 0 || perfStats) && (
                        <div className="flex flex-col gap-1 mb-2">
                            {initialRenderTime > 0 && (
                                <div
                                    className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 rounded-lg text-sm font-medium">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                    <span>Initial Render: <strong>{initialRenderTime.toFixed(2)}ms</strong></span>
                                </div>
                            )}

                            {perfStats && (
                                <div className="flex flex-wrap gap-2">
                                    <div
                                        className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-deep-purple-100 to-deep-purple-200 text-deep-purple-800 rounded-lg text-sm font-medium">
                                        <div className="w-2 h-2 bg-deep-purple-500 rounded-full"></div>
                                        <span>FPS: <strong>{perfStats.fps.toFixed(1)}</strong></span>
                                    </div>

                                    <div
                                        className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-lg text-sm font-medium">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span>Frame: <strong>{perfStats.frameTime.toFixed(2)}ms</strong></span>
                                    </div>

                                    <div
                                        className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-teal-100 to-teal-200 text-teal-800 rounded-lg text-sm font-medium">
                                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                        <span>JS Calc: <strong>{perfStats.calcTime.toFixed(2)}ms</strong></span>
                                    </div>

                                    <div
                                        className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-rose-100 to-rose-200 text-rose-800 rounded-lg text-sm font-medium">
                                        <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                                        <span>Plotly Render: <strong>{animationRenderTime.toFixed(2)}ms</strong></span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <Plot
                        data={plotData}
                        layout={plotLayout}
                        // config={{responsive: true}} // INFO: Uncomment this line to make the plot responsive, but will make weird bug when on mobile
                        className="h-full md:h-[80vh] w-full"
                        onAfterPlot={() => {
                            const now = performance.now();

                            // Check for normal render
                            if (initialRenderStartRef.current > 0) {
                                const duration = now - initialRenderStartRef.current;
                                setInitialRenderTime(duration);
                                initialRenderStartRef.current = 0;
                            }

                            // Check for animation frame render
                            if (animationRenderStartRef.current > 0) {
                                const duration = now - animationRenderStartRef.current;
                                setAnimationRenderTime(duration); // Update animation state
                                animationRenderStartRef.current = 0;
                            }
                        }}
                    />
                </div>
            ) : (
                <div className="text-center">
                    <div className="text-lg font-semibold mb-2">Area Visualisasi</div>
                    <div className="text-sm">Tempat untuk menampilkan visualisasi transformasi geometri.</div>
                </div>
            )}
        </div>

    );
}