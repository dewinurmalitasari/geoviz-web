import {Button} from "@/components/ui/button.tsx";
import type {ReactNode} from "react";
import {cn} from "@/lib/utils.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {Slot} from "@radix-ui/react-slot";
import {Link} from "@tanstack/react-router";
import {useAnimatedNavigation} from "@/hooks/use-animated-navigation.ts";
import { colorMap, DEFAULT_COLOR_SCHEME, type ColorScheme } from "@/lib/color-scheme";

interface GeoButtonProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'destructive' | 'outline';
    isLoading?: boolean;
    className?: string;
    asChild?: boolean;
    to?: string;
    colorScheme?: ColorScheme;
    disabled?: boolean;
}

const getVariantStyle = (variant: string, colorScheme: ColorScheme) => {
    const colors = colorMap[colorScheme];

    switch (variant) {
        case 'primary':
            return colors.button?.primary || `bg-gradient-to-r ${colors.primary.from} ${colors.primary.to} text-white ${colors.primary.hoverFrom} ${colors.primary.hoverTo}`;
        case 'secondary':
            return colors.button?.secondary || `bg-gradient-to-r ${colors.iconBg} ${colors.text} dark:${colors.primary.from} dark:${colors.primary.to} dark:text-white hover:${colors.iconBg.replace('from-', 'from-').replace('to-', 'to-')}`;
        case 'destructive':
            return "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 dark:from-red-500 dark:to-red-600 dark:hover:from-red-600 dark:hover:to-red-700";
        case 'outline':
            return colors.button?.outline || `border-1 ${colors.trigger.split(' ')[2].replace('focus:border-', 'border-')} ${colors.text} dark:${colors.icon} bg-transparent hover:${colors.cardSelected.split(' ')[2]}`;
        default:
            return colors.button?.primary || `bg-gradient-to-r ${colors.primary.from} ${colors.primary.to} text-white ${colors.primary.hoverFrom} ${colors.primary.hoverTo}`;
    }
};

export default function GeoButton(
    {
        onClick,
        children,
        variant = 'primary',
        isLoading = false,
        className,
        asChild = false,
        to,
        colorScheme = DEFAULT_COLOR_SCHEME,
        disabled
    }: GeoButtonProps) {
    const Comp = asChild ? Slot : Button;
    const animatedNavigate = useAnimatedNavigation();

    return (
        <Comp
            className={cn(
                "w-full h-full flex justify-center items-center gap-2 px-5 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-103 active:scale-95 cursor-pointer",
                getVariantStyle(variant, colorScheme),
                className
            )}
            onClick={onClick}
            disabled={isLoading || disabled}
            asChild={to ? true : asChild}
        >
            {to ? (
                <Link
                    to={to}
                    onClick={(e) => {
                        e.preventDefault();
                        animatedNavigate({to});
                    }}
                >
                    {isLoading ? <Spinner/> : children}
                </Link>
            ) : (
                isLoading ? <Spinner/> : children
            )}
        </Comp>
    );
}