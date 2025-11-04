import {
    type DilatationValue,
    type Point2D,
    type Point3D,
    type ReflectionValue,
    type RotationValue,
    TRANSFORMATION_TYPES,
    type TranslationValue
} from "@/type.ts";

export function calculate2DTransformedCoordinates(
    points: Point2D[],
    type: 'translation' | 'dilatation' | 'rotation' | 'reflection',
    values: TranslationValue | DilatationValue | RotationValue | ReflectionValue
): Point2D[] {
    switch (type) {
        case TRANSFORMATION_TYPES.TRANSLATION:
            const translateValues = values as TranslationValue;
            return points.map(point => ({
                x: point.x + translateValues.translateX,
                y: point.y + translateValues.translateY
            }));

        case TRANSFORMATION_TYPES.DILATATION:
            const dilatationValues = values as DilatationValue;
            return points.map(point => ({
                x: point.x * dilatationValues.scaleFactor,
                y: point.y * dilatationValues.scaleFactor
            }));

        case TRANSFORMATION_TYPES.ROTATION:
            const rotationValues = values as RotationValue;
            const degree = rotationValues.angle;
            const radian = degree * (Math.PI / 180);
            return points.map(point => ({
                x: point.x * Math.cos(radian) - point.y * Math.sin(radian),
                y: point.x * Math.sin(radian) + point.y * Math.cos(radian)
            }));

        case TRANSFORMATION_TYPES.REFLECTION:
            const reflectionValues = values as ReflectionValue;
            if ((reflectionValues.axis === 'line-y-k' || reflectionValues.axis === 'line-x-k') && reflectionValues.k === undefined) {
                throw new Error('Reflection axis line-y-k or line-x-k requires k value');
            }

            const axis = reflectionValues.axis;
            const k = reflectionValues.k!;

            return points.map(point => {
                switch (axis) {
                    case 'origin':
                        return {x: -point.x, y: -point.y};
                    case 'x-axis':
                        return {x: point.x, y: -point.y};
                    case 'y-axis':
                        return {x: -point.x, y: point.y};
                    case 'line-y-x':
                        return {x: point.y, y: point.x};
                    case 'line-y-neg-x':
                        return {x: -point.y, y: -point.x};
                    case 'line-y-k':
                        return {x: point.x, y: 2 * k - point.y};
                    case 'line-x-k':
                        return {x: 2 * k - point.x, y: point.y};
                    default:
                        return point;
                }
            });

        default:
            throw new Error(`Unknown transformation type: ${type}`);
    }
}

export function calculate3DTransformedCoordinates(
    points: Point3D[],
    type: 'translation' | 'dilatation' | 'rotation' | 'reflection',
    values: TranslationValue | DilatationValue | RotationValue | ReflectionValue
): Point3D[] {
    switch (type) {
        case TRANSFORMATION_TYPES.TRANSLATION:
            const translationValues = values as TranslationValue;
            return points.map(point => ({
                x: point.x + translationValues.translateX,
                y: point.y + translationValues.translateY,
                z: point.z + translationValues.translateZ!
            }));

        case TRANSFORMATION_TYPES.DILATATION:
            const dilatationValues = values as DilatationValue;
            return points.map(point => ({
                x: point.x * dilatationValues.scaleFactor,
                y: point.y * dilatationValues.scaleFactor,
                z: point.z * dilatationValues.scaleFactor
            }));

        case TRANSFORMATION_TYPES.ROTATION:
            const rotationValues = values as RotationValue;
            const degree = rotationValues.angle;
            const radian = degree * (Math.PI / 180);
            const axis = rotationValues.axis!;
            return points.map(point => {
                const cosTheta = Math.cos(radian);
                const sinTheta = Math.sin(radian);
                switch (axis) {
                    case 'radio_x_axis':
                        return {
                            x: point.x,
                            y: point.y * cosTheta - point.z * sinTheta,
                            z: point.y * sinTheta + point.z * cosTheta
                        };
                    case 'radio_y_axis':
                        return {
                            x: point.x * cosTheta + point.z * sinTheta,
                            y: point.y,
                            z: -point.x * sinTheta + point.z * cosTheta
                        };
                    case 'radio_z_axis':
                        return {
                            x: point.x * cosTheta - point.y * sinTheta,
                            y: point.x * sinTheta + point.y * cosTheta,
                            z: point.z
                        };
                    default:
                        return point;
                }
            });

        case TRANSFORMATION_TYPES.REFLECTION:
            const reflectionValues = values as ReflectionValue;
            const reflectionAxis = reflectionValues.axis;
            return points.map(point => {
                switch (reflectionAxis) {
                    case 'radio-xy-plane':
                        return {x: point.x, y: point.y, z: -point.z};
                    case 'radio-yz-plane':
                        return {x: -point.x, y: point.y, z: point.z};
                    case 'radio-xz-plane':
                        return {x: point.x, y: -point.y, z: point.z};
                    default:
                        return point;
                }
            });

        default:
            throw new Error(`Unknown transformation type: ${type}`);
    }
}
