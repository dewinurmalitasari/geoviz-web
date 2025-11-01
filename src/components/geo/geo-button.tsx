import {Button} from "@/components/ui/button.tsx";
import type {ReactNode} from "react";
import {cn} from "@/lib/utils.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {Slot} from "@radix-ui/react-slot";
import {Link} from "@tanstack/react-router";

interface GeoButtonProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'destructive' | 'outline';
    isLoading?: boolean;
    className?: string;
    asChild?: boolean;
    to?: string;
}

const variantStyles = {
    primary: "bg-gradient-to-r from-deep-purple-500 to-deep-purple-700 text-white hover:from-deep-purple-600 hover:to-deep-purple-800",
    secondary: "bg-gradient-to-r from-geo-purple-100 to-geo-purple-200 text-deep-purple-500 dark:from-deep-purple-600 dark:to-deep-purple-500 dark:text-geo-purple-50 hover:from-geo-purple-200 hover:to-geo-purple-300 dark:hover:from-deep-purple-500 dark:hover:to-deep-purple-400",
    destructive: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 dark:from-red-500 dark:to-red-600 dark:hover:from-red-600 dark:hover:to-red-700",
    outline: "border-1 border-deep-purple-500 text-deep-purple-700 dark:text-deep-purple-300 bg-transparent hover:bg-deep-purple-50 dark:hover:bg-deep-purple-900/20"
};

export default function GeoButton({onClick, children, variant = 'primary', isLoading = false, className, asChild = false, to}: GeoButtonProps) {
    const Comp = asChild ? Slot : Button;

    return (
        <Comp
            className={cn(
                "w-full h-full flex justify-center items-center gap-2 px-5 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-103 active:scale-95 cursor-pointer",
                variantStyles[variant],
                className
            )}
            onClick={onClick}
            disabled={isLoading}
            asChild={to? true : asChild}
        >
            {to ? (
                <Link to={to}>
                    {isLoading ? <Spinner/> : children}
                </Link>
            ) : (
                isLoading ? <Spinner/> : children
            )}
        </Comp>
    );
}
