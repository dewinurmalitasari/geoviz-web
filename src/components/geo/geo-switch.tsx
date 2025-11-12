import { Switch } from "@/components/ui/switch";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { colorMap, DEFAULT_COLOR_SCHEME, type ColorScheme } from "@/lib/color-scheme";

interface GeoSwitchProps {
  id: string;
  label?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  icon?: ReactNode;
  description?: string;
  className?: string;
  disabled?: boolean;
  colorScheme?: ColorScheme;
  size?: 'sm' | 'md' | 'lg';
}


const sizeMap = {
  sm: {
    switch: "h-5 w-9",
    thumb: "h-4 w-4 data-[state=checked]:translate-x-4",
    label: "text-sm",
    icon: "w-3 h-3"
  },
  md: {
    switch: "h-6 w-11",
    thumb: "h-5 w-5 data-[state=checked]:translate-x-5",
    label: "text-base",
    icon: "w-4 h-4"
  },
  lg: {
    switch: "h-7 w-14",
    thumb: "h-6 w-6 data-[state=checked]:translate-x-7",
    label: "text-lg",
    icon: "w-5 h-5"
  },
};

export default function GeoSwitch({
  id,
  label,
  checked,
  onCheckedChange,
  icon,
  description,
  className,
  disabled = false,
  colorScheme = DEFAULT_COLOR_SCHEME,
  size = 'md'
}: GeoSwitchProps) {
  const colors = colorMap[colorScheme];
  const sizes = sizeMap[size];

  return (
    <Field className={className}>
      <div className="flex items-center gap-3">
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          className={cn(
            "relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
            "bg-gray-300 data-[state=checked]:bg-primary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            colors.checked,
            colors.focus,
            sizes.switch,
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <span
            className={cn(
              "pointer-events-none inline-block transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
              colors.thumb,
              sizes.thumb
            )}
          >
            {icon && (
              <div className={cn(
                "flex items-center justify-center w-full h-full",
                sizes.icon
              )}>
                {icon}
              </div>
            )}
          </span>
        </Switch>

        {label && (
          <FieldLabel
            htmlFor={id}
            className={cn(
              "font-medium cursor-pointer select-none",
              colors.label,
              sizes.label,
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {label}
          </FieldLabel>
        )}
      </div>

      {description && (
        <FieldDescription className="mt-2 ml-14">
          {description}
        </FieldDescription>
      )}
    </Field>
  );
}