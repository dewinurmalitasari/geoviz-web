import { parse } from 'mathjs';
import type { Data } from 'plotly.js';

// The number of points to calculate for each line.
// More points = smoother curve, but slightly more computation.
const PLOT_RESOLUTION = 1000;

export function get2DEquationPlotData(
    equations: string[],
    xRange: [number, number],
    colors: string[] = ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6']
): Data[] {
    const traces: Data[] = [];
    const [xMin, xMax] = xRange;
    const step = (xMax - xMin) / PLOT_RESOLUTION;

    // 1. Generate a common set of x-values to evaluate each function at.
    const xValues: number[] = [];
    for (let i = 0; i <= PLOT_RESOLUTION; i++) {
        xValues.push(xMin + i * step);
    }

    // 2. Loop through each equation string
    for (let i = 0; i < equations.length; i++) {
        const equationStr = equations[i].trim();
        if (!equationStr) continue; // Skip empty equations

        const color = colors[i % colors.length];
        const yValues: (number | null)[] = []; // Use null for discontinuities (e.g., 1/x at x=0)
        let compiledExpr;

        try {
            // 3. Parse the expression using math.js
            const node = parse(equationStr);
            compiledExpr = node.compile();
        } catch (error) {
            console.error(`Error parsing equation "${equationStr}":`, error);
            // Skip this equation if it's invalid
            continue;
        }

        // 4. Evaluate the compiled function for each x-value
        for (const x of xValues) {
            try {
                const y = compiledExpr.evaluate({ x: x });

                // Handle non-numeric or infinite results (e.g., 1/0)
                if (typeof y === 'number' && isFinite(y)) {
                    yValues.push(y);
                } else {
                    yValues.push(null); // This creates a break in the Plotly line
                }
            } catch (error) {
                // Handle evaluation errors (e.g., sqrt(-1) for real numbers)
                yValues.push(null);
            }
        }

        // 5. Create the Plotly trace for this equation
        traces.push({
            x: xValues,
            y: yValues,
            mode: 'lines',
            type: 'scattergl',
            name: `y = ${equationStr}`, // Shows "y = x^2" in the legend
            line: { color: color, width: 2.5 },
            hoverinfo: 'x+y',
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
        margin: { t: 40, l: 30, r: 30, b: 30 }, // Add top margin for legend
        dragmode: 'pan',
        legend: {
            orientation: 'h' as const, // 'h' for horizontal
            yanchor: 'bottom' as const,
            y: 1.02,
            xanchor: 'right' as const,
            x: 1
        },
        xaxis: {
            range: xRange,
            dtick: 1,
            zeroline: true, // Draw a solid line at x=0
            zerolinecolor: '#888',
            zerolinewidth: 2,
        },
        yaxis: {
            range: yRange,
            dtick: 1,
            // scaleanchor: 'x' as const, // This is key for a 1:1 aspect ratio
            zeroline: true, // Draw a solid line at y=0
            zerolinecolor: '#888',
            zerolinewidth: 2,
        }
    };
}