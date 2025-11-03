import {Button} from "@/components/ui/button.tsx";
import type {ReactNode} from "react";
import {cn} from "@/lib/utils.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {Slot} from "@radix-ui/react-slot";
import {Link} from "@tanstack/react-router";
import {useAnimatedNavigation} from "@/hooks/use-animated-navigation.ts";

interface GeoButtonProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'destructive' | 'outline';
    isLoading?: boolean;
    className?: string;
    asChild?: boolean;
    to?: string;
    colorScheme?: 'purple' | 'blue' | 'green' | 'red' | 'orange' | 'teal';
}

const variantStyles = {
    primary: {
        purple: "bg-gradient-to-r from-deep-purple-500 to-deep-purple-700 text-white hover:from-deep-purple-600 hover:to-deep-purple-800",
        blue: "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800",
        green: "bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800",
        red: "bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800",
        orange: "bg-gradient-to-r from-orange-500 to-orange-700 text-white hover:from-orange-600 hover:to-orange-800",
        teal: "bg-gradient-to-r from-teal-500 to-teal-700 text-white hover:from-teal-600 hover:to-teal-800",
    },
    secondary: {
        purple: "bg-gradient-to-r from-deep-purple-100 to-deep-purple-200 text-deep-purple-500 dark:from-deep-purple-600 dark:to-deep-purple-500 dark:text-deep-purple-50 hover:from-deep-purple-200 hover:to-deep-purple-300 dark:hover:from-deep-purple-500 dark:hover:to-deep-purple-400",
        blue: "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-500 dark:from-blue-600 dark:to-blue-500 dark:text-blue-50 hover:from-blue-200 hover:to-blue-300 dark:hover:from-blue-500 dark:hover:to-blue-400",
        green: "bg-gradient-to-r from-green-100 to-green-200 text-green-500 dark:from-green-600 dark:to-green-500 dark:text-green-50 hover:from-green-200 hover:to-green-300 dark:hover:from-green-500 dark:hover:to-green-400",
        red: "bg-gradient-to-r from-red-100 to-red-200 text-red-500 dark:from-red-600 dark:to-red-500 dark:text-red-50 hover:from-red-200 hover:to-red-300 dark:hover:from-red-500 dark:hover:to-red-400",
        orange: "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-500 dark:from-orange-600 dark:to-orange-500 dark:text-orange-50 hover:from-orange-200 hover:to-orange-300 dark:hover:from-orange-500 dark:hover:to-orange-400",
        teal: "bg-gradient-to-r from-teal-100 to-teal-200 text-teal-500 dark:from-teal-600 dark:to-teal-500 dark:text-teal-50 hover:from-teal-200 hover:to-teal-300 dark:hover:from-teal-500 dark:hover:to-teal-400",
    },
    destructive: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 dark:from-red-500 dark:to-red-600 dark:hover:from-red-600 dark:hover:to-red-700",
    outline: {
        purple: "border-1 border-deep-purple-500 text-deep-purple-700 dark:text-deep-purple-300 bg-transparent hover:bg-deep-purple-50 dark:hover:bg-deep-purple-900/20",
        blue: "border-1 border-blue-500 text-blue-700 dark:text-blue-300 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20",
        green: "border-1 border-green-500 text-green-700 dark:text-green-300 bg-transparent hover:bg-green-50 dark:hover:bg-green-900/20",
        red: "border-1 border-red-500 text-red-700 dark:text-red-300 bg-transparent hover:bg-red-50 dark:hover:bg-red-900/20",
        orange: "border-1 border-orange-500 text-orange-700 dark:text-orange-300 bg-transparent hover:bg-orange-50 dark:hover:bg-orange-900/20",
        teal: "border-1 border-teal-500 text-teal-700 dark:text-teal-300 bg-transparent hover:bg-teal-50 dark:hover:bg-teal-900/20",
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
        colorScheme = 'purple'
    }: GeoButtonProps) {
    const Comp = asChild ? Slot : Button;
    const animatedNavigate = useAnimatedNavigation();

    // Get the appropriate style based on variant and colorScheme
    const getVariantStyle = () => {
        if (variant === 'destructive') return variantStyles.destructive;

        if (variant === 'primary' || variant === 'secondary' || variant === 'outline') {
            return variantStyles[variant][colorScheme];
        }

        return variantStyles.primary[colorScheme]; // fallback
    };

    return (
        <Comp
            className={cn(
                "w-full h-full flex justify-center items-center gap-2 px-5 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-103 active:scale-95 cursor-pointer",
                getVariantStyle(),
                className
            )}
            onClick={onClick}
            disabled={isLoading}
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