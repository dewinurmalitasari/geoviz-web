import Plot from "react-plotly.js";
import type {PerformanceStats, PlotlyData, PlotlyLayout, Point} from "@/type.ts";
import {useState} from "react";
import GeoSwitch from "../geo/geo-switch";
import {cn} from "@/lib/utils";
import type {ColorScheme} from "@/lib/color-scheme";
import {colorMap, DEFAULT_COLOR_SCHEME} from "@/lib/color-scheme";

interface PlotContainerProps {
    shapePoints: Point[];
    plotData: PlotlyData;
    plotLayout: PlotlyLayout;
    perfStats: PerformanceStats
    initialRenderStartRef: React.MutableRefObject<number>;
    animationRenderStartRef: React.MutableRefObject<number>;
    colorScheme?: ColorScheme;
}

export default function PlotContainer(
    {
        shapePoints,
        plotData,
        plotLayout,
        perfStats,
        initialRenderStartRef,
        animationRenderStartRef,
        colorScheme = DEFAULT_COLOR_SCHEME,
    }: PlotContainerProps) {
    const [animationRenderTime, setAnimationRenderTime] = useState<number>(0);
    const [initialRenderTime, setInitialRenderTime] = useState<number>(0);
    const [fixedAspectRatio, setFixedAspectRatio] = useState<boolean>(false);
    const colors = colorMap[colorScheme];

    return (
        <div
            className={cn("flex-5 bg-gradient-to-br rounded-xl p-2 md:p-4 flex items-center justify-center", colors.iconBg)}
        >
            {shapePoints.length > 0 ? (
                <div className="flex flex-col w-full h-full">
                    <div className={cn("flex items-center justify-end gap-4 mb-2 border rounded-lg px-3 py-2 bg-white/70", colors.border)}>
                        <GeoSwitch
                            id="fixed-aspect-ratio-switch"
                            label="Kunci interval sumbu menjadi 1"
                            checked={fixedAspectRatio}
                            onCheckedChange={setFixedAspectRatio}
                            colorScheme={colorScheme}
                            size="md"
                        />
                    </div>

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
                                        className={cn("flex items-center gap-2 px-3 py-2 bg-gradient-to-r rounded-lg text-sm font-medium", colors.iconBg, colors.label)}
                                    >
                                        <div className={cn("w-2 h-2 rounded-full", colors.checked.replace('data-[state=checked]:', ''))}></div>
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
                        layout={{
                            ...plotLayout,
                            xaxis: {
                                ...plotLayout.xaxis,
                                dtick: fixedAspectRatio ? 1 : undefined,
                            },
                            yaxis: {
                                ...plotLayout.yaxis,
                                dtick: fixedAspectRatio ? 1 : undefined,
                            },
                            ...(plotLayout.scene && {
                                scene: {
                                    ...plotLayout.scene,
                                    xaxis: {
                                        ...plotLayout.scene.xaxis,
                                        dtick: fixedAspectRatio ? 1 : undefined,
                                    },
                                    yaxis: {
                                        ...plotLayout.scene.yaxis,
                                        dtick: fixedAspectRatio ? 1 : undefined,
                                    },
                                    zaxis: {
                                        ...plotLayout.scene.zaxis,
                                        dtick: fixedAspectRatio ? 1 : undefined,
                                    },
                                },
                            }),
                        }}
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