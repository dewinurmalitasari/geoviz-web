import { cn } from "@/lib/utils";
import { Annoyed, CircleHelp, Frown, Smile } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {Spinner} from "@/components/ui/spinner.tsx";

interface ReactionSelectProps {
    onSelect: (reaction: 'happy' | 'neutral' | 'sad' | 'confused') => void;
    value?: 'happy' | 'neutral' | 'sad' | 'confused';
    colorScheme?: 'purple' | 'blue' | 'orange' | 'teal' | 'yellow' | 'maroon';
    className?: string;
    headerType?: 'material' | 'practice';
    isLoading?: boolean;
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
        hover: "hover:border-deep-purple-300 hover:bg-deep-purple-25",
        icon: "text-deep-purple-600",
        text: "text-deep-purple-700",
        header: "text-deep-purple-800",
        button: "text-deep-purple-700 hover:bg-deep-purple-50 border-deep-purple-200",
        popover: "border-deep-purple-200"
    },
    blue: {
        selected: "border-blue-500 bg-blue-50 shadow-md",
        hover: "hover:border-blue-300 hover:bg-blue-25",
        icon: "text-blue-600",
        text: "text-blue-700",
        header: "text-blue-800",
        button: "text-blue-700 hover:bg-blue-50 border-blue-200",
        popover: "border-blue-200"
    },
    orange: {
        selected: "border-orange-500 bg-orange-50 shadow-md",
        hover: "hover:border-orange-300 hover:bg-orange-25",
        icon: "text-orange-600",
        text: "text-orange-700",
        header: "text-orange-800",
        button: "text-orange-700 hover:bg-orange-50 border-orange-200",
        popover: "border-orange-200"
    },
    teal: {
        selected: "border-teal-500 bg-teal-50 shadow-md",
        hover: "hover:border-teal-300 hover:bg-teal-25",
        icon: "text-teal-600",
        text: "text-teal-700",
        header: "text-teal-800",
        button: "text-teal-700 hover:bg-teal-50 border-teal-200",
        popover: "border-teal-200"
    },
    yellow: {
        selected: "border-yellow-500 bg-yellow-50 shadow-md",
        hover: "hover:border-yellow-300 hover:bg-yellow-25",
        icon: "text-yellow-600",
        text: "text-yellow-700",
        header: "text-yellow-800",
        button: "text-yellow-700 hover:bg-yellow-50 border-yellow-200",
        popover: "border-yellow-200"
    },
    maroon: {
        selected: "border-rose-500 bg-rose-50 shadow-md",
        hover: "hover:border-rose-300 hover:bg-rose-25",
        icon: "text-rose-600",
        text: "text-rose-700",
        header: "text-rose-800",
        button: "text-rose-700 hover:bg-rose-50 border-rose-200",
        popover: "border-rose-200"
    },
};

export default function ReactionSelect(
    {
        onSelect,
        value,
        colorScheme = "purple",
        className,
        headerType = 'material',
        isLoading = false
    }: ReactionSelectProps) {
    const colors = colorMap[colorScheme];
    const [open, setOpen] = useState(false);

    const handleSelect = (reaction: 'happy' | 'neutral' | 'sad' | 'confused') => {
        if (isLoading) return;

        onSelect(reaction);
        setOpen(false); // Close popover after selection
    };

    const getHeaderText = () => {
        const typeText = headerType === 'material' ? 'materi' : 'latihan';
        return `Beri reaksi terhadap ${typeText} ini`;
    };

    const getSelectedReactionData = () => {
        return reactionOptions.find(option => option.value === value);
    };

    const selectedData = getSelectedReactionData();

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
                            "bg-white hover:bg-gray-50 hover:scale-103 active:scale-95 cursor-pointer",
                            colors.button,
                            isLoading && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            {value ? (
                                <>
                                    <div className={cn("flex-shrink-0", colors.icon)}>
                                        {selectedData?.icon && (
                                            <selectedData.icon className="w-5 h-5"/>
                                        )}
                                    </div>
                                    <div className="text-left flex-1 md:flex-none">
                                        <div className={cn("font-medium text-sm", colors.header)}>
                                            {selectedData?.label}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {getHeaderText()}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className={cn("font-medium text-sm", colors.header)}>
                                    {isLoading ? <Spinner/> : getHeaderText()}
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
                        "w-64 p-2 bg-white rounded-lg shadow-lg border-2",
                        colors.popover
                    )}
                    align="start"
                >
                    <div className="space-y-1">
                        {reactionOptions.map((option) => {
                            const Icon = option.icon;
                            const isSelected = value === option.value;

                            return (
                                <div
                                    key={option.value}
                                    className={cn(
                                        "w-full p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer",
                                        "flex items-center gap-3",
                                        isSelected ? colors.selected : "border-transparent bg-transparent",
                                        !isLoading && colors.hover,
                                        isLoading && "opacity-50 cursor-not-allowed"
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
                </PopoverContent>
            </Popover>
        </div>
    );
}