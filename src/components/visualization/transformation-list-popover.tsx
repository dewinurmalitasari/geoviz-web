import {cn} from "@/lib/utils";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {FlipHorizontal, Move, RotateCw, Trash2, ZoomIn} from "lucide-react";
import type {DilatationValue, ReflectionValue, RotationValue, Transformation, TranslationValue} from "@/type.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

interface TransformationListPopoverProps {
    transformations: Transformation[];
    onTransformationsChange: (transformations: Transformation[]) => void;
    colorScheme?: 'purple' | 'blue' | 'orange' | 'teal' | 'yellow' | 'maroon';
    className?: string;
    isLoading?: boolean;
}

const transformationIcons = {
    translation: Move,
    dilatation: ZoomIn,
    rotation: RotateCw,
    reflection: FlipHorizontal,
};

const transformationLabels = {
    translation: 'Translasi',
    dilatation: 'Dilatasi',
    rotation: 'Rotasi',
    reflection: 'Refleksi',
};

const colorMap = {
    purple: {
        selected: "border-deep-purple-500 bg-deep-purple-50 shadow-md",
        hover: "hover:border-deep-purple-300 hover:bg-deep-purple-25",
        icon: "text-deep-purple-600",
        text: "text-deep-purple-700",
        header: "text-deep-purple-800",
        button: "text-deep-purple-700 hover:bg-deep-purple-50 border-deep-purple-200",
        popover: "border-deep-purple-200",
        delete: "text-deep-purple-500 hover:text-deep-purple-700 hover:bg-deep-purple-100",
    },
    blue: {
        selected: "border-blue-500 bg-blue-50 shadow-md",
        hover: "hover:border-blue-300 hover:bg-blue-25",
        icon: "text-blue-600",
        text: "text-blue-700",
        header: "text-blue-800",
        button: "text-blue-700 hover:bg-blue-50 border-blue-200",
        popover: "border-blue-200",
        delete: "text-blue-500 hover:text-blue-700 hover:bg-blue-100",
    },
    orange: {
        selected: "border-orange-500 bg-orange-50 shadow-md",
        hover: "hover:border-orange-300 hover:bg-orange-25",
        icon: "text-orange-600",
        text: "text-orange-700",
        header: "text-orange-800",
        button: "text-orange-700 hover:bg-orange-50 border-orange-200",
        popover: "border-orange-200",
        delete: "text-orange-500 hover:text-orange-700 hover:bg-orange-100",
    },
    teal: {
        selected: "border-teal-500 bg-teal-50 shadow-md",
        hover: "hover:border-teal-300 hover:bg-teal-25",
        icon: "text-teal-600",
        text: "text-teal-700",
        header: "text-teal-800",
        button: "text-teal-700 hover:bg-teal-50 border-teal-200",
        popover: "border-teal-200",
        delete: "text-teal-500 hover:text-teal-700 hover:bg-teal-100",
    },
    yellow: {
        selected: "border-yellow-500 bg-yellow-50 shadow-md",
        hover: "hover:border-yellow-300 hover:bg-yellow-25",
        icon: "text-yellow-600",
        text: "text-yellow-700",
        header: "text-yellow-800",
        button: "text-yellow-700 hover:bg-yellow-50 border-yellow-200",
        popover: "border-yellow-200",
        delete: "text-yellow-500 hover:text-yellow-700 hover:bg-yellow-100",
    },
    maroon: {
        selected: "border-rose-500 bg-rose-50 shadow-md",
        hover: "hover:border-rose-300 hover:bg-rose-25",
        icon: "text-rose-600",
        text: "text-rose-700",
        header: "text-rose-800",
        button: "text-rose-700 hover:bg-rose-50 border-rose-200",
        popover: "border-rose-200",
        delete: "text-rose-500 hover:text-rose-700 hover:bg-rose-100",
    },
};

function formatTransformationValue(transformation: Transformation): string {
    const {type, value} = transformation;

    switch (type) {
        case 'translation':
            const translation = value as TranslationValue;
            if ('translateZ' in translation) {
                return `X: ${translation.translateX}, Y: ${translation.translateY}, Z: ${translation.translateZ}`;
            }
            return `X: ${translation.translateX}, Y: ${translation.translateY}`;

        case 'dilatation':
            const dilatation = value as DilatationValue;
            return `Skala: ${dilatation.scaleFactor}`;

        case 'rotation':
            const rotation = value as RotationValue;
            if ('axis' in rotation && rotation.axis) {
                return `Sudut: ${rotation.angle}°, Sumbu: ${rotation.axis.translateTransformationValue()}`;
            }
            return `Sudut: ${rotation.angle}°`;

        case 'reflection':
            const reflection = value as ReflectionValue;
            let axisText = reflection.axis.translateTransformationValue();
            if (('k' in reflection) && reflection.k !== undefined) {
                axisText += `, K: ${reflection.k}`;
            }
            return axisText;

        default:
            return 'Nilai tidak diketahui';
    }
}

export default function TransformationListPopover(
    {
        transformations,
        onTransformationsChange,
        colorScheme = "purple",
        className,
        isLoading = false
    }: TransformationListPopoverProps) {
    const colors = colorMap[colorScheme];
    const [open, setOpen] = useState(false);

    const handleDeleteTransformation = (index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const newTransformations = transformations.filter((_, i) => i !== index);
        onTransformationsChange(newTransformations);
    };

    const getFirstTransformationData = () => {
        if (transformations.length === 0) {
            return null;
        }
        return transformations[0];
    };

    const firstTransformation = getFirstTransformationData();

    return (
        <div className={cn("w-full", className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        disabled={isLoading}
                        className={cn(
                            "w-full p-4 h-auto rounded-lg border-2 transition-all duration-200",
                            "flex flex-col md:flex-row items-center justify-between gap-3",
                            "bg-white hover:bg-gray-50 hover:scale-102 active:scale-101 cursor-pointer",
                            colors.button,
                            isLoading && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            {firstTransformation ? (
                                <>
                                    <div className={cn("flex-shrink-0", colors.icon)}>
                                        {(() => {
                                            const IconComponent = transformationIcons[firstTransformation.type];
                                            return <IconComponent className="w-5 h-5"/>;
                                        })()}
                                    </div>
                                    <div className="text-left flex-1 md:flex-none">
                                        <div className={cn("font-medium text-sm", colors.header)}>
                                            {transformations.length > 1
                                                ? `${transformations.length} Transformasi`
                                                : transformationLabels[firstTransformation.type]
                                            }
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {transformations.length > 1
                                                ? 'Klik untuk melihat daftar'
                                                : formatTransformationValue(firstTransformation)
                                            }
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className={cn("font-medium text-sm", colors.header)}>
                                    {isLoading ? 'Memuat...' : 'Belum ada transformasi'}
                                </div>
                            )}
                        </div>

                        <div className={cn(
                            "w-5 h-5 flex items-center justify-center transition-transform duration-200",
                            open && "rotate-180",
                            colors.icon
                        )}>
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4 6H11L7.5 10.5L4 6Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    className={cn(
                        "w-[85vw] md:w-[50vw] p-4 bg-white rounded-lg shadow-lg border-2", // TODO: Width
                        colors.popover
                    )}
                    align="start"
                >
                    <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h3 className={cn("font-semibold text-sm", colors.header)}>
                                Daftar Transformasi ({transformations.length})
                            </h3>
                            {transformations.length > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onTransformationsChange([])}
                                    disabled={isLoading}
                                    className={cn("text-xs cursor-pointer", colors.delete)}
                                >
                                    <Trash2/> Hapus Semua
                                </Button>
                            )}
                        </div>


                        {/* Transformations List*/}
                        <ScrollArea className="max-h-100 pr-3">
                            <div className="space-y-2 max-h-100">
                                {transformations.length === 0 ? (
                                    <div className="text-center py-4 text-gray-500 text-sm">
                                        Belum ada transformasi yang ditambahkan
                                    </div>
                                ) : (
                                    transformations.map((transformation, index) => {
                                        const IconComponent = transformationIcons[transformation.type];

                                        return (
                                            <div
                                                key={index}
                                                className={cn(
                                                    "w-full p-3 rounded-lg border-2 transition-all duration-200",
                                                    "flex items-center gap-3 group",
                                                    colors.selected,
                                                    !isLoading && colors.hover,
                                                    isLoading && "opacity-50 cursor-not-allowed"
                                                )}
                                            >
                                                {/* Step Number */}
                                                <div className={cn(
                                                    "flex-shrink-0 w-6 h-6 text-white rounded-full flex items-center justify-center text-xs font-medium",
                                                    colors.icon.replace("text-", "bg-"),
                                                )}>
                                                    {index + 1}
                                                </div>

                                                {/* Icon */}
                                                <div className={cn("flex-shrink-0", colors.icon)}>
                                                    <IconComponent className="w-4 h-4"/>
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className={cn("font-medium text-sm", colors.text)}>
                                                        {transformationLabels[transformation.type]}
                                                    </div>
                                                    <div className={cn("text-xs", "text-gray-600")}>
                                                        {formatTransformationValue(transformation)}
                                                    </div>
                                                </div>

                                                {/* Delete Button */}
                                                <Button
                                                    variant="ghost"
                                                    size="lg"
                                                    onClick={(e) => handleDeleteTransformation(index, e)}
                                                    disabled={isLoading}
                                                    className={cn(
                                                        "p-0 cursor-pointer",
                                                        colors.delete
                                                    )}
                                                >
                                                    <Trash2 className="w-3 h-3"/>
                                                </Button>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </ScrollArea>

                        {/* Footer Hint */}
                        {transformations.length > 0 && (
                            <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                                Transformasi akan dijalankan secara berurutan
                            </div>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}