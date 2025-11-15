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
            const center = rotationValues.center as Point2D;

            return points.map(point => {
                // Translate point to origin
                const translatedX = point.x - center.x;
                const translatedY = point.y - center.y;

                // Rotate around origin
                const rotatedX = translatedX * Math.cos(radian) - translatedY * Math.sin(radian);
                const rotatedY = translatedX * Math.sin(radian) + translatedY * Math.cos(radian);

                // Translate back to original center
                return {
                    x: rotatedX + center.x,
                    y: rotatedY + center.y
                };
            });

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
            const center = rotationValues.center as Point3D;

            return points.map(point => {
                // Translate point to origin
                const translatedX = point.x - center.x;
                const translatedY = point.y - center.y;
                const translatedZ = point.z - center.z;

                const cosTheta = Math.cos(radian);
                const sinTheta = Math.sin(radian);

                let rotatedX, rotatedY, rotatedZ;

                switch (axis) {
                    case 'radio_x_axis':
                        rotatedX = translatedX;
                        rotatedY = translatedY * cosTheta - translatedZ * sinTheta;
                        rotatedZ = translatedY * sinTheta + translatedZ * cosTheta;
                        break;
                    case 'radio_y_axis':
                        rotatedX = translatedX * cosTheta + translatedZ * sinTheta;
                        rotatedY = translatedY;
                        rotatedZ = -translatedX * sinTheta + translatedZ * cosTheta;
                        break;
                    case 'radio_z_axis':
                        rotatedX = translatedX * cosTheta - translatedY * sinTheta;
                        rotatedY = translatedX * sinTheta + translatedY * cosTheta;
                        rotatedZ = translatedZ;
                        break;
                    default:
                        rotatedX = translatedX;
                        rotatedY = translatedY;
                        rotatedZ = translatedZ;
                }

                // Translate back to original center
                return {
                    x: rotatedX + center.x,
                    y: rotatedY + center.y,
                    z: rotatedZ + center.z
                };
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
