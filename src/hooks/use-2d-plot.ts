import type {Point2D} from "@/type.ts";

export function get2DShapePlotData(
    points: Point2D[],
    color = 'blue'
) {
    if (points.length < 2) return [];

    const xValues = points.map(point => point.x);
    const yValues = points.map(point => point.y);

    // Close the shape by repeating the first point at the end
    const closedX = [...xValues, xValues[0]];
    const closedY = [...yValues, yValues[0]];

    // Create the line trace
    const lineTrace = {
        x: closedX,
        y: closedY,
        mode: 'lines',
        type: 'scatter',
        line: { color: color, width: 3 },
        name: 'Shape',
        showlegend: false
    };

    // Create the points trace
    const pointsTrace = {
        x: xValues,
        y: yValues,
        mode: 'markers',
        type: 'scatter',
        marker: { color: color, size: 10 },
        name: 'Points',
        showlegend: false
    };

    // Create labels trace (optional)
    const labelsTrace = {
        x: xValues.map(x => x + 0.2), // Slightly to the right of the point
        y: yValues.map(y => y + 0.2), // Slightly above the point
        mode: 'text',
        type: 'scatter',
        text: points.map((_, i) => String.fromCharCode(65 + i)), // A, B, C, etc.
        textfont: { size: 14, color: color },
        showlegend: false,
    };

    return [lineTrace, pointsTrace, labelsTrace];
}

export function get2DShapePlotLayout(
    xRange: [number, number],
    yRange: [number, number],
) {
    return {
        margin: {t: 0, l: 30, r: 30, b: 30},
        dragmode: 'pan',
        xaxis: {
            range: xRange,
            dtick: 1
        },
        yaxis: {
            range: yRange,
            dtick: 1,
            scaleanchor: 'x'
        }
    };
}
