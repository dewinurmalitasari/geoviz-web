import {
    type DilatationValue,
    type Point2D,
    type ReflectionValue,
    type RotationValue,
    TRANSFORMATION_TYPES,
    type TranslationValue
} from "@/type.ts";
import {PRESET_POINTS} from "@/lib/shape-preset.ts";

export function useGeneratePracticeTypeAndValue() {
    const generateTransformationType = (): string => {
        const types = Object.values(TRANSFORMATION_TYPES);
        const randomIndex = Math.floor(Math.random() * types.length);
        return types[randomIndex];
    };

    const generateTransformationValue = (type: string) => {
        switch (type) {
            case TRANSFORMATION_TYPES.TRANSLATION:
                return generateTranslationValue();
            case TRANSFORMATION_TYPES.DILATATION:
                return generateDilatationValue();
            case TRANSFORMATION_TYPES.ROTATION:
                return generateRotationValue();
            case TRANSFORMATION_TYPES.REFLECTION:
                return generateReflectionValue();
            default:
                throw new Error(`Unknown transformation type: ${type}`);
        }
    };

    const generateTranslationValue = (): TranslationValue => {
        // Range: -10 to 10 for both x and y
        const translateX = Math.floor(Math.random() * 21) - 10; // -10 to 10
        const translateY = Math.floor(Math.random() * 21) - 10; // -10 to 10
        return {translateX, translateY};
    };

    const generateDilatationValue = (): DilatationValue => {
        // Range: -3 to 3, excluding 0 and 1
        const possibleValues = [2, 3];
        const randomIndex = Math.floor(Math.random() * possibleValues.length);
        return {scaleFactor: possibleValues[randomIndex]};
    };

    const generateRotationValue = (): RotationValue => {
        // Specific angles: 90, 180, 270, -90, -180, -270
        const possibleAngles = [90, 180, 270, -90, -180, -270];
        const randomIndex = Math.floor(Math.random() * possibleAngles.length);
        return {angle: possibleAngles[randomIndex]};
    };

    const generateReflectionValue = (): ReflectionValue => {
        // All axes except radio types, k range: -5 to 5
        const possibleAxes = [
            'origin',
            'x-axis',
            'y-axis',
            'line-y-x',
            'line-y-neg-x',
            'line-y-k',
            'line-x-k'
        ] as const;

        const randomIndex = Math.floor(Math.random() * possibleAxes.length);
        const axis = possibleAxes[randomIndex];

        if (axis === 'line-y-k' || axis === 'line-x-k') {
            const k = Math.floor(Math.random() * 11) - 5; // -5 to 5
            return {axis, k};
        }

        return {axis};
    };

    return {
        generateTransformationType,
        generateTransformationValue,
        generateTranslationValue,
        generateDilatationValue,
        generateRotationValue,
        generateReflectionValue
    };
}

export function useGeneratePracticeShape() {
    const generateRandomShape = () => {
        // Simple 2D shapes without complex ones
        const simpleShapes = ['triangle', 'square', 'rectangle', 'pentagon', 'hexagon'] as const;
        const randomIndex = Math.floor(Math.random() * simpleShapes.length);
        const selectedShape = simpleShapes[randomIndex];

        return {
            shapeName: selectedShape,
            points: generateShapePoints(selectedShape)
        };
    };

    const generateShapePoints = (shapeName: string): Point2D[] => {
        const basePoints = PRESET_POINTS[shapeName];
        if (!basePoints) return [];

        // Generate random offset to place shape in different quadrants
        // Avoid zero and keep reasonable distance from axes
        const offsetX = generateNonZeroOffset();
        const offsetY = generateNonZeroOffset();

        // Apply offset to all points
        return basePoints.map(point => ({
            x: point.x + offsetX,
            y: point.y + offsetY
        }));
    };

    const generateNonZeroOffset = (): number => {
        // Generate offset that avoids zero and covers all quadrants
        // Range: -8 to -3 or 3 to 8 (avoiding -2 to 2 range)
        const isNegative = Math.random() < 0.5;
        const magnitude = Math.floor(Math.random() * 6) + 3; // 3 to 8
        return isNegative ? -magnitude : magnitude;
    };

    return {
        generateRandomShape,
        generateShapePoints
    };
}