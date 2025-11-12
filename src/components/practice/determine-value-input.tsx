import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import GeoInput from "@/components/geo/geo-input";
import GeoSelect from "@/components/geo/geo-select";
import {cn} from "@/lib/utils";
import type {DilatationValue, ReflectionValue, RotationValue, TranslationValue} from "@/type";
import { colorMap, DEFAULT_COLOR_SCHEME, type ColorScheme } from "@/lib/color-scheme";

interface DetermineValueInputProps {
    question: string;
    instruction?: string;
    transformationType: 'translation' | 'dilatation' | 'rotation' | 'reflection';
    onValueChange: (values: TranslationValue | DilatationValue | RotationValue | ReflectionValue) => void;
    currentValues?: TranslationValue | DilatationValue | RotationValue | ReflectionValue;
    disabled?: boolean;
    colorScheme?: ColorScheme;
    showResult?: boolean;
    isCorrect?: boolean;
}

const reflection2DOptions = [
    {value: 'origin', label: 'Titik Pusat (0,0)'},
    {value: 'x-axis', label: 'Sumbu X'},
    {value: 'y-axis', label: 'Sumbu Y'},
    {value: 'line-y-x', label: 'Garis y = x'},
    {value: 'line-y-neg-x', label: 'Garis y = -x'},
    {value: 'line-y-k', label: 'Garis y = k'},
    {value: 'line-x-k', label: 'Garis x = k'},
];

// Helper function to translate transformation types to Indonesian
const translateTransformationType = (type: string): string => {
    switch (type) {
        case 'translation':
            return 'Translasi';
        case 'dilatation':
            return 'Dilatasi';
        case 'rotation':
            return 'Rotasi';
        case 'reflection':
            return 'Refleksi';
        default:
            return type;
    }
};

export default function DetermineValueInput(
    {
        question,
        instruction = "Tentukan nilai transformasi:",
        transformationType,
        onValueChange,
        currentValues,
        disabled = false,
        colorScheme = DEFAULT_COLOR_SCHEME,
        showResult = false,
        isCorrect = false
    }: DetermineValueInputProps) {
    const colors = colorMap[colorScheme];

    const handleValueChange = (field: string, value: any) => {
        const newValues = {...currentValues, [field]: value};
        onValueChange(newValues as any);
    };

    const getInputClasses = () => {
        const baseClasses = cn(
            "w-full p-4 rounded-lg border-2 transition-all duration-200",
            colors.border,
            disabled && "cursor-not-allowed opacity-60",
            showResult && isCorrect && "border-green-500 bg-green-50",
            showResult && !isCorrect && "border-red-500 bg-red-50"
        );

        return baseClasses;
    };

    const renderTranslationInputs = () => {
        const values = currentValues as TranslationValue || {translateX: 0, translateY: 0};

        return (
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <GeoInput
                        id="translate-x"
                        label="Translasi X"
                        value={values.translateX || 0}
                        onChange={(e) => handleValueChange('translateX', parseFloat(e.target.value) || 0)}
                        type="number"
                        disabled={disabled}
                        icon={<span className="text-xs font-bold">X</span>}
                    />
                    <GeoInput
                        id="translate-y"
                        label="Translasi Y"
                        value={values.translateY || 0}
                        onChange={(e) => handleValueChange('translateY', parseFloat(e.target.value) || 0)}
                        type="number"
                        disabled={disabled}
                        icon={<span className="text-xs font-bold">Y</span>}
                    />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Masukkan nilai translasi pada sumbu X dan Y
                </p>
            </div>
        );
    };

    const renderDilatationInputs = () => {
        const values = currentValues as DilatationValue || {scaleFactor: 1};

        return (
            <div className="space-y-4">
                <GeoInput
                    id="scale-factor"
                    label="Faktor Skala"
                    value={values.scaleFactor || 1}
                    onChange={(e) => handleValueChange('scaleFactor', parseFloat(e.target.value) || 1)}
                    type="number"
                    disabled={disabled}
                    icon={<span className="text-xs font-bold">k</span>}
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Masukkan faktor skala dilatasi
                </p>
            </div>
        );
    };

    const renderRotationInputs = () => {
        const values = currentValues as RotationValue || {angle: 0};

        return (
            <div className="space-y-4">
                <GeoInput
                    id="rotation-angle"
                    label="Sudut Rotasi (derajat)"
                    value={values.angle || 0}
                    onChange={(e) => handleValueChange('angle', parseFloat(e.target.value) || 0)}
                    type="number"
                    disabled={disabled}
                    icon={<span className="text-xs font-bold">°</span>}
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Masukkan sudut rotasi dalam derajat
                </p>
            </div>
        );
    };

    const renderReflectionInputs = () => {
        const values = currentValues as ReflectionValue || {axis: 'x-axis'};
        const needsKValue = values.axis === 'line-y-k' || values.axis === 'line-x-k';

        return (
            <div className="space-y-4">
                <GeoSelect
                    id="reflection-axis"
                    label="Sumbu Refleksi"
                    value={values.axis || 'x-axis'}
                    onValueChange={(value) => handleValueChange('axis', value)}
                    options={reflection2DOptions}
                    disabled={disabled}
                />

                {needsKValue && (
                    <GeoInput
                        id="reflection-k"
                        label="Nilai k"
                        value={values.k || 0}
                        onChange={(e) => handleValueChange('k', parseFloat(e.target.value) || 0)}
                        type="number"
                        disabled={disabled}
                        icon={<span className="text-xs font-bold">k</span>}
                    />
                )}

                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Pilih sumbu refleksi {needsKValue && "dan masukkan nilai k"}
                </p>
            </div>
        );
    };

    const renderInputs = () => {
        switch (transformationType) {
            case 'translation':
                return renderTranslationInputs();
            case 'dilatation':
                return renderDilatationInputs();
            case 'rotation':
                return renderRotationInputs();
            case 'reflection':
                return renderReflectionInputs();
            default:
                return null;
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {question}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                    {instruction}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className={getInputClasses()}>
                    <div className="mb-4">
                        <h4 className="font-semibold text-center text-gray-700 dark:text-gray-300">
                            Jenis Transformasi: {translateTransformationType(transformationType)}
                        </h4>
                    </div>

                    {renderInputs()}

                    {showResult && (
                        <div className={cn(
                            "mt-4 p-3 rounded-lg text-center font-medium",
                            isCorrect
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : "bg-red-100 text-red-800 border border-red-200"
                        )}>
                            {isCorrect ? "✓ Jawaban Benar" : "✗ Jawaban Salah"}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}