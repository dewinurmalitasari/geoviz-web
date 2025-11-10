// reaction-select.tsx
import {cn} from "@/lib/utils";
import {Annoyed, ChevronDown, CircleHelp, Frown, Smile} from "lucide-react";
import {useState} from "react";

interface ReactionSelectProps {
    onSelect: (reaction: 'happy' | 'neutral' | 'sad' | 'confused') => void;
    defaultValue?: 'happy' | 'neutral' | 'sad' | 'confused';
    disabled?: boolean;
    colorScheme?: 'purple' | 'blue' | 'orange' | 'teal' | 'yellow' | 'maroon';
    className?: string;
    headerType?: 'material' | 'practice';
}

const reactionOptions = [
    {
        value: 'happy' as const,
        label: 'Senang',
        icon: Smile,
        description: 'Puas'
    },
    {
        value: 'neutral' as const,
        label: 'Biasa',
        icon: Annoyed,
        description: 'Netral'
    },
    {
        value: 'sad' as const,
        label: 'Sedih',
        icon: Frown,
        description: 'Kurang Puas'
    },
    {
        value: 'confused' as const,
        label: 'Bingung',
        icon: CircleHelp,
        description: 'Membingungkan'
    }
];

const colorMap = {
    purple: {
        selected: "border-deep-purple-500 bg-deep-purple-50 shadow-md",
        hover: "hover:border-deep-purple-300",
        icon: "text-deep-purple-600",
        text: "text-deep-purple-700",
        header: "text-deep-purple-800",
        button: "text-deep-purple-600 hover:bg-deep-purple-50"
    },
    blue: {
        selected: "border-blue-500 bg-blue-50 shadow-md",
        hover: "hover:border-blue-300",
        icon: "text-blue-600",
        text: "text-blue-700",
        header: "text-blue-800",
        button: "text-blue-600 hover:bg-blue-50"
    },
    orange: {
        selected: "border-orange-500 bg-orange-50 shadow-md",
        hover: "hover:border-orange-300",
        icon: "text-orange-600",
        text: "text-orange-700",
        header: "text-orange-800",
        button: "text-orange-600 hover:bg-orange-50"
    },
    teal: {
        selected: "border-teal-500 bg-teal-50 shadow-md",
        hover: "hover:border-teal-300",
        icon: "text-teal-600",
        text: "text-teal-700",
        header: "text-teal-800",
        button: "text-teal-600 hover:bg-teal-50"
    },
    yellow: {
        selected: "border-yellow-500 bg-yellow-50 shadow-md",
        hover: "hover:border-yellow-300",
        icon: "text-yellow-600",
        text: "text-yellow-700",
        header: "text-yellow-800",
        button: "text-yellow-600 hover:bg-yellow-50"
    },
    maroon: {
        selected: "border-rose-500 bg-rose-50 shadow-md",
        hover: "hover:border-rose-300",
        icon: "text-rose-600",
        text: "text-rose-700",
        header: "text-rose-800",
        button: "text-rose-600 hover:bg-rose-50"
    },
};

export default function ReactionSelect(
    {
        onSelect,
        defaultValue,
        disabled = false,
        colorScheme = "purple",
        className,
        headerType = 'material'
    }: ReactionSelectProps) {
    const colors = colorMap[colorScheme];
    const [selectedReaction, setSelectedReaction] = useState(defaultValue);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSelect = (reaction: 'happy' | 'neutral' | 'sad' | 'confused') => {
        if (disabled) return;

        setSelectedReaction(reaction);
        onSelect(reaction);
        // Auto-collapse after selection (optional)
        // setIsExpanded(false);
    };

    const toggleExpand = () => {
        if (disabled) return;
        setIsExpanded(!isExpanded);
    };

    const getHeaderText = () => {
        const typeText = headerType === 'material' ? 'materi' : 'latihan';
        return `Beri reaksi terhadap ${typeText} ini`;
    };

    const getSelectedReactionData = () => {
        return reactionOptions.find(option => option.value === selectedReaction);
    };

    return (
        <div className={cn("w-full", className)}>
            {/* Header Button */}
            <button
                onClick={toggleExpand}
                disabled={disabled}
                className={cn(
                    "w-full p-4 rounded-lg border-2 transition-all duration-200",
                    "flex flex-col md:flex-row items-center justify-between gap-3",
                    "bg-white border-gray-200",
                    colors.button,
                    !disabled && "hover:shadow-md cursor-pointer",
                    disabled && "opacity-50 cursor-not-allowed"
                )}
            >
                <div className="flex items-center gap-3 w-full md:w-auto">
                    {selectedReaction ? (
                        <>
                            <div className={cn("flex-shrink-0", colors.icon)}>
                                {(() => {
                                    const SelectedIcon = getSelectedReactionData()?.icon;
                                    return SelectedIcon ? <SelectedIcon className="w-5 h-5"/> : null;
                                })()}
                            </div>
                            <div className="text-left flex-1 md:flex-none">
                                <div className={cn("font-medium text-sm", colors.header)}>
                                    {getSelectedReactionData()?.label}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {getHeaderText()}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className={cn("font-medium", colors.header)}>
                            {getHeaderText()}
                        </div>
                    )}
                </div>

                <ChevronDown
                    className={cn(
                        "w-4 h-4 transition-transform duration-200 flex-shrink-0",
                        isExpanded && "rotate-180",
                        colors.icon
                    )}
                />
            </button>

            {/* Expandable Content */}
            {isExpanded && (
                <div className="mt-2 space-y-2 animate-in fade-in-50 duration-200">
                    {reactionOptions.map((option) => {
                        const Icon = option.icon;
                        const isSelected = selectedReaction === option.value;

                        return (
                            <div
                                key={option.value}
                                className={cn(
                                    "w-full p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer",
                                    "flex items-center gap-3",
                                    isSelected ? colors.selected : "border-gray-200 bg-white",
                                    !disabled && !isSelected && colors.hover,
                                    disabled && "opacity-50 cursor-not-allowed"
                                )}
                                onClick={() => handleSelect(option.value)}
                            >
                                <div className={cn(
                                    "flex-shrink-0",
                                    isSelected ? colors.icon : "text-gray-400"
                                )}>
                                    <Icon className="w-5 h-5"/>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className={cn(
                                        "font-medium text-sm",
                                        isSelected ? colors.text : "text-gray-700"
                                    )}>
                                        {option.label}
                                    </div>
                                    <div className={cn(
                                        "text-xs",
                                        isSelected ? "text-gray-600" : "text-gray-500"
                                    )}>
                                        {option.description}
                                    </div>
                                </div>

                                {isSelected && (
                                    <div className={cn(
                                        "w-2 h-2 rounded-full flex-shrink-0",
                                        colors.icon.replace("text-", "bg-")
                                    )}/>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}