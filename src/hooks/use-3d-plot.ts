import type {Point3D} from "@/type.ts";

export function get3DShapePlotData(
    points: Point3D[],
    color = 'cyan'
) {
    if (points.length < 3) return [];

    const xValues = points.map(point => point.x);
    const yValues = points.map(point => point.y);
    const zValues = points.map(point => point.z);

    // Generate mesh data for the 3D shape
    const meshData = generateMeshDataFromPoints(points);

    // Create the mesh trace
    const meshTrace = {
        type: 'mesh3d',
        x: meshData.x,
        y: meshData.y,
        z: meshData.z,
        i: meshData.i,
        j: meshData.j,
        k: meshData.k,
        opacity: 1,
        color: color,
        flatshading: true,
        name: '3D Shape',
        showlegend: false
    };

    // Create the points trace
    const pointsTrace = {
        type: 'scatter3d',
        x: xValues,
        y: yValues,
        z: zValues,
        mode: 'markers',
        marker: {
            color: 'black',
            size: 3,
            symbol: 'circle'
        },
        name: 'Points',
        showlegend: false
    };

    const labels = points.map((_, i) => String.fromCharCode(65 + i));

    const textPositions = points.map((point) => {
        const x = point.x;
        const y = point.y;
        const z = point.z;

        const maxX = Math.max(...xValues);
        const minX = Math.min(...xValues);
        const maxY = Math.max(...yValues);
        const minY = Math.min(...yValues);
        const maxZ = Math.max(...zValues);
        const minZ = Math.min(...zValues);

        // Determine vertical position
        let vertical = 'middle';
        if (z === maxZ) vertical = 'top';
        else if (z === minZ) vertical = 'bottom';

        // Determine horizontal position
        let horizontal = 'center';
        if (x === maxX) horizontal = 'center'; // Orig right
        else if (x === minX) horizontal = 'center'; // Orig left

        // For points at extreme Y values, adjust if not already at extremes in X or Z
        if (y === maxY && horizontal === 'center') horizontal = 'center'; // Orig right
        if (y === minY && horizontal === 'center') horizontal = 'center'; // Orig left

        return `${vertical} ${horizontal}`;
    });

    const labelsTrace = {
        type: 'scatter3d',
        mode: 'text',
        x: xValues,
        y: yValues,
        z: zValues,
        text: labels,
        textposition: textPositions,
        textfont: {
            size: 16,
            color: 'black'
        },
        showlegend: false,
        marker: {}
    };

    return [meshTrace, pointsTrace, labelsTrace];
}

export function get3DShapePlotLayout(
    xRange: [number, number],
    yRange: [number, number],
    zRange: [number, number]
) {
    return {
        margin: {t: 0, l: 30, r: 30, b: 30},
        scene: {
            xaxis: {range: xRange},
            yaxis: {range: yRange},
            zaxis: {range: zRange},
            camera: {eye: {x: 0, y: -1.5, z: 1}},
            aspectratio: {x: 1, y: 1, z: 1},
        },
        legend: {
            x: 0.1,
            y: 0.9,
            traceorder: 'normal',
            font: {
                family: 'sans-serif',
                size: 12,
                color: '#000'
            },
            bgcolor: 'lightgray',
            bordercolor: 'black',
            borderwidth: 2
        },
    };
}

function generateMeshDataFromPoints(points: Point3D[]) {
    const x = points.map(p => p.x);
    const y = points.map(p => p.y);
    const z = points.map(p => p.z);

    let faces: number[][] = [];

    // This creates all possible triangles between points
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            for (let k = j + 1; k < points.length; k++) {
                faces.push([i, j, k]);
            }
        }
    }

    // Flatten the faces into i, j, k arrays for Plotly
    const i = faces.map(f => f[0]);
    const j = faces.map(f => f[1]);
    const k = faces.map(f => f[2]);

    return {x, y, z, i, j, k};
}

export function get3DAxisTraces(
    xRange: [number, number],
    yRange: [number, number],
    zRange: [number, number]
) {
    const xAxisTrace = {
        type: 'scatter3d',
        mode: 'lines',
        x: [xRange[0], xRange[1]],
        y: [0, 0],
        z: [0, 0],
        line: {
            color: 'red',
            width: 5
        },
        name: 'Sumbu X',
    };

    const yAxisTrace = {
        type: 'scatter3d',
        mode: 'lines',
        x: [0, 0],
        y: [yRange[0], yRange[1]],
        z: [0, 0],
        line: {
            color: 'blue',
            width: 5
        },
        name: 'Sumbu Y',
    };

    const zAxisTrace = {
        type: 'scatter3d',
        mode: 'lines',
        x: [0, 0],
        y: [0, 0],
        z: [zRange[0], zRange[1]],
        line: {
            color: 'green',
            width: 5
        },
        name: 'Sumbu Z',
    };

    return [xAxisTrace, yAxisTrace, zAxisTrace];
}