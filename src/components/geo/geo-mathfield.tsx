import {MathfieldElement} from 'mathlive';
import {forwardRef, useEffect, useRef} from 'react';
import {colorMap, type ColorScheme, DEFAULT_COLOR_SCHEME} from "@/lib/color-scheme.ts";
import {Field, FieldLabel} from "@/components/ui/field.tsx";
import {cn} from "@/lib/utils.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

// Extend the global JSX namespace
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'math-field': React.DetailedHTMLProps<
                React.HTMLAttributes<MathfieldElement> & {
                onInput?: (evt: CustomEvent) => void;
                onChange?: (evt: CustomEvent) => void;
            },
                MathfieldElement
            >;
        }
    }
}

interface GeoMathFieldProps {
    id: string;
    label?: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
    colorScheme?: ColorScheme;
}

const GeoMathField = forwardRef<MathfieldElement, GeoMathFieldProps>((
    {
        id,
        label,
        value,
        onChange,
        className = "",
        colorScheme = DEFAULT_COLOR_SCHEME,
    }
) => {
    const mathfieldRef = useRef<MathfieldElement>(null);
    const colors = colorMap[colorScheme];

    // Update value when prop changes
    useEffect(() => {
        const mathfield = mathfieldRef.current;
        if (mathfield && mathfield.value !== value) {
            mathfield.value = value;
        }
    }, [value]);

    return (
        <Field className={className}>
            {label && (
                <FieldLabel htmlFor={id} className={cn("font-bold text-md", colors.label)}>
                    {label}
                </FieldLabel>
            )}

            <ScrollArea className={cn("border rounded-lg max-h-40 overflow-y-auto", colors.trigger.replace('focus:border-', 'border-').split(' ')[0])}>
                {/*// @ts-ignore*/}
                <math-field
                    ref={mathfieldRef}
                    id={id}
                    class={cn(
                        "border rounded-md p-2 w-full min-h-[40px]",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500",
                        colors.border,
                    )}
                    onInput={(evt: CustomEvent) => {
                        const mf = evt.target as MathfieldElement;
                        onChange(mf.value);
                    }}
                    onChange={(evt: CustomEvent) => {
                        const mf = evt.target as MathfieldElement;
                        onChange(mf.value);
                    }}
                />
            </ScrollArea>
        </Field>
    );
});

GeoMathField.displayName = 'GeoMathField';

export default GeoMathField;