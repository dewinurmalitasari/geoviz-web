import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Field, FieldDescription, FieldLabel} from "@/components/ui/field";
import {cn} from "@/lib/utils";
import type {ReactNode} from "react";
import { colorMap, DEFAULT_COLOR_SCHEME, type ColorScheme } from "@/lib/color-scheme";

interface GeoSelectProps {
    id: string;
    label?: string;
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    options: Array<{
        value: string;
        label: string;
        disabled?: boolean;
    }>;
    icon?: ReactNode;
    description?: string;
    className?: string;
    disabled?: boolean;
    colorScheme?: ColorScheme;
    maxHeight?: string;
}

export default function GeoSelect(
    {
        id,
        label,
        value,
        onValueChange,
        placeholder = "Select an option...",
        options,
        icon,
        description,
        className,
        disabled = false,
        colorScheme = DEFAULT_COLOR_SCHEME,
        maxHeight = "min(400px, 60vh)" // Default max height that adapts to screen size
    }: GeoSelectProps) {
    const colors = colorMap[colorScheme];

    return (
        <Field className={className}>
            {label && (
                <FieldLabel
                    htmlFor={id}
                    className={cn("font-bold text-md", colors.label)}
                >
                    {label}
                </FieldLabel>
            )}

            <Select value={value} onValueChange={onValueChange} disabled={disabled}>
                <SelectTrigger
                    id={id}
                    className={cn(
                        "w-full px-4 py-3 rounded-lg border bg-white shadow-sm transition-all duration-200",
                        "hover:shadow-md focus:ring-2 focus:ring-opacity-20",
                        colors.trigger,
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                >
                    <div className="flex items-center gap-3 w-full">
                        {icon && (
                            <div className={cn("flex-shrink-0", colors.icon)}>
                                {icon}
                            </div>
                        )}
                        <SelectValue placeholder={placeholder}/>
                    </div>
                </SelectTrigger>

                <SelectContent
                    className="bg-white border rounded-lg shadow-lg py-2"
                    position="popper"
                    style={{maxHeight}}
                >
                    <div
                        className="overflow-y-auto overflow-x-hidden"
                        style={{
                            maxHeight: `calc(${maxHeight} - 1rem)`, // Account for padding
                            scrollbarWidth: 'thin',
                        }}
                    >
                        {options.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                                className={cn(
                                    "px-4 py-3 cursor-pointer transition-colors duration-150",
                                    "hover:bg-gray-50 focus:bg-gray-50",
                                    "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
                                    "border-b border-gray-100 last:border-b-0"
                                )}
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </div>
                </SelectContent>
            </Select>

            {description && <FieldDescription>{description}</FieldDescription>}
        </Field>
    );
}