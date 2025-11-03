import type {Point2D, Point3D} from "@/type.ts";

function isPoint3D(point: Point2D | Point3D): point is Point3D {
    return 'z' in point;
}

export function calculateRange(
    originalPoints: Point2D[] | Point3D[],
    transformedPoints: Point2D[] | Point3D[] = [],
    padding: number = 1
): {
    xRange: [number, number],
    yRange: [number, number],
    zRange?: [number, number]
} {
    const xValues = originalPoints.map(point => point.x).concat(transformedPoints.map(point => point.x));
    const yValues = originalPoints.map(point => point.y).concat(transformedPoints.map(point => point.y));

    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    const xMargin = (xMax - xMin) * padding;
    const yMargin = (yMax - yMin) * padding;

    if (originalPoints.length > 0 && isPoint3D(originalPoints[0])) {
        const zValues = (originalPoints as Point3D[])
            .map(point => point.z)
            .concat((transformedPoints as Point3D[]).map(point => point.z));

        const zMin = Math.min(...zValues);
        const zMax = Math.max(...zValues);
        const zMargin = (zMax - zMin) * padding;

        return {
            xRange: [xMin - xMargin, xMax + xMargin],
            yRange: [yMin - yMargin, yMax + yMargin],
            zRange: [zMin - zMargin, zMax + zMargin]
        };
    }

    return {
        xRange: [xMin - xMargin, xMax + xMargin],
        yRange: [yMin - yMargin, yMax + yMargin]
    };
}
