// [File: hooks/use-equation-plot.ts]

import {type EvalFunction, parse} from 'mathjs';
import type {Data} from 'plotly.js';

// The number of points to calculate for each line.
const PLOT_RESOLUTION = 10000;

/**
 * [EXISTING FUNCTION - UNCHANGED]
 * Generates Plotly trace data for explicit 2D equations (y = f(x)).
 */
export function get2DEquationPlotData(
    equations: string[],
    xRange: [number, number],
    colors: string[] = ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6']
): Data[] {
    const traces: Data[] = [];
    const [xMin, xMax] = xRange;
    const step = (xMax - xMin) / PLOT_RESOLUTION;

    // 1. Generate a common set of x-values
    const xValues: number[] = [];
    for (let i = 0; i <= PLOT_RESOLUTION; i++) {
        xValues.push(xMin + i * step);
    }

    // 2. Loop through each equation string
    for (let i = 0; i < equations.length; i++) {
        const equationStr = equations[i].trim();
        if (!equationStr) continue;

        const color = colors[i % colors.length];
        const yValues: (number | null)[] = [];
        let compiledExpr;

        try {
            // 3. Parse the expression
            const node = parse(equationStr);
            compiledExpr = node.compile();
        } catch (error) {
            console.error(`Error parsing equation "${equationStr}":`, error);
            continue;
        }

        // 4. Evaluate for each x-value
        for (const x of xValues) {
            try {
                const y = compiledExpr.evaluate({x: x});
                if (typeof y === 'number' && isFinite(y)) {
                    yValues.push(y);
                } else {
                    yValues.push(null);
                }
            } catch (error) {
                yValues.push(null);
            }
        }

        // 5. Create the Plotly trace
        traces.push({
            x: xValues,
            y: yValues,
            mode: 'lines',
            type: 'scattergl',
            name: `y = ${equationStr}`,
            line: {color: color, width: 2.5},
            hoverinfo: 'x+y+name',
            showlegend: true
        });
    }

    return traces;
}

export function get2DEquationPlotLayout(
    xRange: [number, number],
    yRange: [number, number],
) {
    return {
        margin: {t: 40, l: 30, r: 30, b: 30},
        dragmode: 'pan',
        legend: {
            orientation: 'h' as const,
            yanchor: 'bottom' as const,
            y: 1.02,
            xanchor: 'right' as const,
            x: 1
        },
        xaxis: {
            range: xRange,
            dtick: 1,
            zeroline: true,
            zerolinecolor: '#888',
            zerolinewidth: 2,
        },
        yaxis: {
            range: yRange,
            dtick: 1,
            // scaleanchor: 'x' as const, // We apply this conditionally in the page component
            zeroline: true,
            zerolinecolor: '#888',
            zerolinewidth: 2,
        }
    };
}

export function getParametricPlotData(
    xEqStr: string,
    yEqStr: string,
    tRange: [number, number],
    color: string = '#6366F1'
): Data | null {
    if (!xEqStr || !yEqStr) return null;

    const [tMin, tMax] = tRange;
    const step = (tMax - tMin) / PLOT_RESOLUTION;
    let compiledX: EvalFunction, compiledY: EvalFunction;

    try {
        compiledX = parse(xEqStr).compile();
        compiledY = parse(yEqStr).compile();
    } catch (error) {
        console.error("Error parsing parametric equations:", error);
        return null;
    }

    const xValues: (number | null)[] = [];
    const yValues: (number | null)[] = [];

    for (let i = 0; i <= PLOT_RESOLUTION; i++) {
        const t = tMin + i * step;
        const scope = {t: t, pi: Math.PI, e: Math.E}; // Add constants

        try {
            const x = compiledX.evaluate(scope);
            const y = compiledY.evaluate(scope);

            if (typeof x === 'number' && isFinite(x) && typeof y === 'number' && isFinite(y)) {
                xValues.push(x);
                yValues.push(y);
            } else {
                xValues.push(null);
                yValues.push(null);
            }
        } catch (error) {
            xValues.push(null);
            yValues.push(null);
        }
    }

    return {
        x: xValues,
        y: yValues,
        mode: 'lines',
        type: 'scattergl',
        name: `x=${xEqStr}, y=${yEqStr}`,
        line: {color: color, width: 2.5},
        hoverinfo: 'x+y+name',
        showlegend: true
    };
}

export function getPolarPlotData(
    rEqStr: string,
    thetaRange: [number, number],
    color: string = '#EC4899'
): Data | null {
    if (!rEqStr) return null;

    const [thetaMin, thetaMax] = thetaRange;
    const step = (thetaMax - thetaMin) / PLOT_RESOLUTION;
    let compiledR: EvalFunction;

    try {
        compiledR = parse(rEqStr).compile();
    } catch (error) {
        console.error("Error parsing polar equation:", error);
        return null;
    }

    const xValues: (number | null)[] = [];
    const yValues: (number | null)[] = [];

    for (let i = 0; i <= PLOT_RESOLUTION; i++) {
        const theta = thetaMin + i * step;
        const scope = {theta: theta, pi: Math.PI, e: Math.E}; // Add constants

        try {
            const r = compiledR.evaluate(scope);

            if (typeof r === 'number' && isFinite(r)) {
                // Convert polar to cartesian coordinates
                const x = r * Math.cos(theta);
                const y = r * Math.sin(theta);
                xValues.push(x);
                yValues.push(y);
            } else {
                xValues.push(null);
                yValues.push(null);
            }
        } catch (error) {
            xValues.push(null);
            yValues.push(null);
        }
    }

    return {
        x: xValues,
        y: yValues,
        mode: 'lines',
        type: 'scattergl',
        name: `r = ${rEqStr}`,
        line: {color: color, width: 2.5},
        hoverinfo: 'x+y+name',
        showlegend: true
    };
}

export function getImplicitPlotData(
    eqStr: string,
    xRange: [number, number],
    yRange: [number, number],
    color: string = '#10B981',
    resolution: number = 100 // Contour plots are heavy, so lower res is fine
): Data | null {
    if (!eqStr) return null;

    let compiledEq: EvalFunction;
    try {
        compiledEq = parse(eqStr).compile();
    } catch (error) {
        console.error("Error parsing implicit equation:", error);
        return null;
    }

    const [xMin, xMax] = xRange;
    const [yMin, yMax] = yRange;
    const xStep = (xMax - xMin) / resolution;
    const yStep = (yMax - yMin) / resolution;

    const xValues: number[] = [];
    const yValues: number[] = [];
    const zValues: (number | null)[][] = []; // z is a 2D grid

    for (let i = 0; i <= resolution; i++) {
        const y = yMin + i * yStep;
        yValues.push(y);
        const zRow: (number | null)[] = [];

        for (let j = 0; j <= resolution; j++) {
            const x = xMin + j * xStep;
            if (i === 0) xValues.push(x);

            try {
                // Add constants to scope
                const z = compiledEq.evaluate({x: x, y: y, pi: Math.PI, e: Math.E});
                if (typeof z === 'number' && isFinite(z)) {
                    zRow.push(z);
                } else {
                    zRow.push(null);
                }
            } catch (error) {
                zRow.push(null);
            }
        }
        zValues.push(zRow);
    }

    return {
        x: xValues,
        y: yValues,
        z: zValues,
        type: 'contour',
        name: `${eqStr} = 0`,
        contours: {
            coloring: 'lines',
            start: 0,
            end: 0,
            size: 0,
        },
        line: {color: color, width: 2.5},
        hoverinfo: 'none',
        showlegend: true
    };
}