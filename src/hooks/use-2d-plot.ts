import type {Point2D} from "@/type.ts";

export function get2DShapePlotData(
    points: Point2D[],
    isMobile: boolean,
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
    const labels = points.map((_, i) => String.fromCharCode(65 + i));

    // Calculate bounds and center *once* outside the loop
    const maxX = Math.max(...xValues);
    const minX = Math.min(...xValues);
    const maxY = Math.max(...yValues);
    const minY = Math.min(...yValues);

    const centerX = (maxX + minX) / 2;
    const centerY = (maxY + minY) / 2;

    // Calculate offset distance
    const offset = isMobile ? 0.4 : 0.2;

    const textPositions = points.map((point) => {
        const dx = point.x - centerX;
        const dy = point.y - centerY;

        let xOffset = 0;
        let yOffset = 0;

        if (dx === 0 && dy === 0) {
            yOffset = offset;
        } else {
            const magnitude = Math.sqrt(dx * dx + dy * dy);
            xOffset = (dx / magnitude) * offset;
            yOffset = (dy / magnitude) * offset;
        }

        if (points.length > 6) {
            xOffset = xOffset * 2;
            yOffset = yOffset * 2;
        }

        return {x: point.x + xOffset, y: point.y + yOffset};
    });

    // Create labels trace with offset positions
    const labelsTrace = {
        x: textPositions.map(pos => pos.x),
        y: textPositions.map(pos => pos.y),
        mode: 'text',
        type: 'scatter',
        text: labels,
        textfont: {size: 16, color: 'black'},
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
