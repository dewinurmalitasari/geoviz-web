import type {Point2D} from "@/type.ts";

export function get2DShapePlotData(
    points: Point2D[],
    color = 'blue',
) {
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
        line: {color: color, width: 3},
        name: 'Shape',
        showlegend: false
    };

    // Create the points trace
    const pointsTrace = {
        x: xValues,
        y: yValues,
        mode: 'markers',
        type: 'scatter',
        marker: {color: color, size: 10},
        name: 'Points',
        showlegend: false
    };

    // Create labels for the points
    const labelsTrace = {
        x: xValues,
        y: yValues.map((y) => {
            // Determine if point is in upper or lower half based on actual y values
            const midY = (Math.min(...yValues) + Math.max(...yValues)) / 2;
            return y > midY ? y + 0.4 : y - 0.4;
        }),
        mode: 'text',
        type: 'scatter',
        text: points.map((_, i) => String.fromCharCode(65 + i)), // A, B, C, etc.
        textfont: { size: 14, color: 'black' },
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
            range: xRange
        },
        yaxis: {
            range: yRange,
            scaleanchor: 'x'
        }
    };
}
