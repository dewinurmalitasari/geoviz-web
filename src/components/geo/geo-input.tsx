// [file name]: geo-input.tsx
import {Field, FieldDescription, FieldLabel} from "@/components/ui/field.tsx";
import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput} from "@/components/ui/input-group.tsx";
import {useEffect, useRef, useState} from "react";
import {Eye, EyeOff} from "lucide-react";
import {Textarea} from "@/components/ui/textarea.tsx";
import {cn} from "@/lib/utils";
import type {ColorScheme} from "@/lib/color-scheme";
import {colorMap, DEFAULT_COLOR_SCHEME} from "@/lib/color-scheme";

interface GeoInputProps {
    id: string;
    label?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    icon?: React.ReactNode;
    isPassword?: boolean;
    description?: string;
    multiline?: boolean;
    minRows?: number;
    maxRows?: number;
    resizable?: boolean;
    autoExpand?: boolean;
    className?: string;
    type?: string;
    min?: number;
    disabled?: boolean;
    colorScheme?: ColorScheme;
}

export default function GeoInput(
    {
        id,
        label,
        value,
        onChange,
        icon,
        isPassword = false,
        description,
        multiline = false,
        minRows = 1,
        maxRows = 7,
        resizable = true,
        autoExpand = true,
        className = "",
        type = "text",
        min,
        disabled = false,
        colorScheme = DEFAULT_COLOR_SCHEME,
    }: GeoInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const colors = colorMap[colorScheme];

    // Auto-expand functionality for textarea
    useEffect(() => {
        if (multiline && autoExpand && textareaRef.current) {
            const textarea = textareaRef.current;

            // Reset height to auto to get the correct scrollHeight
            textarea.style.height = 'auto';

            // Calculate the content height
            const contentHeight = textarea.scrollHeight;
            const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
            const maxHeight = lineHeight * maxRows;
            const minHeight = lineHeight * minRows;

            // Set the height based on content within min/max bounds
            if (contentHeight > maxHeight) {
                textarea.style.height = `${maxHeight}px`;
                textarea.style.overflowY = 'auto';
            } else if (contentHeight < minHeight) {
                textarea.style.height = `${minHeight}px`;
                textarea.style.overflowY = 'hidden';
            } else {
                textarea.style.height = `${contentHeight}px`;
                textarea.style.overflowY = 'hidden';
            }
        }
    }, [value, multiline, autoExpand, minRows, maxRows]);

    const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Allow Enter key for new lines, but prevent form submission if it's part of a form
        if (e.key === 'Enter' && !e.shiftKey) {
            // You can add custom behavior here if needed
            // For example, to submit on Enter without Shift, you might want to prevent default
            // e.preventDefault();
        }
    };

    return (
        <Field className={className}>
            {label &&
                <FieldLabel htmlFor={id} className={cn("font-bold text-md", colors.label)}>
                    {label}
                </FieldLabel>
            }
            <InputGroup id={id} className={cn("border rounded-lg", colors.trigger.replace('focus:border-', 'border-').split(' ')[0])}>
                {multiline ? (
                    <Textarea
                        ref={textareaRef}
                        id={id}
                        className={cn(
                            `${!resizable ? 'resize-none' : 'resize-y'}`,
                            colors.focus
                        )}
                        placeholder={`${label}...`}
                        value={value}
                        onChange={onChange}
                        onKeyDown={handleTextareaKeyDown}
                        rows={minRows}
                        style={{
                            minHeight: `${minRows * 1.5}rem`,
                            maxHeight: `${maxRows * 1.5}rem`,
                        }}
                        disabled={disabled}
                    />
                ) : (
                    <InputGroupInput
                        type={isPassword ? (showPassword ? 'text' : 'password') : type}
                        placeholder={`${label}...`}
                        value={value}
                        onChange={onChange}
                        min={min}
                        disabled={disabled}
                        className={colors.focus}
                    />
                )}

                {icon && (
                    <InputGroupAddon className={colors.icon}>
                        {icon}
                    </InputGroupAddon>
                )}

                {isPassword && (
                    <InputGroupButton
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                        title={showPassword ? "Hide password" : "Show password"}
                        className={colors.icon}
                    >
                        {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                    </InputGroupButton>
                )}
            </InputGroup>
            {description && <FieldDescription>{description}</FieldDescription>}
        </Field>
    );
}