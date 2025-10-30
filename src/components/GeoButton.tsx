import {Button} from "@/components/ui/button.tsx";
import type {ReactNode} from "react";
import {cn} from "@/lib/utils";
import {Spinner} from "@/components/ui/spinner.tsx";


interface GeoButtonProps {
    onClick: () => void;
    icon?: ReactNode;
    text: string;
    variant?: 'primary' | 'secondary' | 'destructive' | 'outline';
    isLoading?: boolean;
}

const variantStyles = {
    primary: "bg-gradient-to-r from-deep-purple-500 to-deep-purple-700 text-white hover:from-deep-purple-600 hover:to-deep-purple-800",
    secondary: "bg-gradient-to-r from-geo-purple-100 to-geo-purple-200 text-deep-purple-500 dark:from-deep-purple-600 dark:to-deep-purple-500 dark:text-geo-purple-50 hover:from-geo-purple-200 hover:to-geo-purple-300 dark:hover:from-deep-purple-500 dark:hover:to-deep-purple-400",
    destructive: "bg-gradient-to-r from-destructive to-red-600 text-white hover:from-red-600 hover:to-red-700",
    outline: "border-2 border-deep-purple-500 text-deep-purple-700 dark:text-deep-purple-300 bg-transparent hover:bg-deep-purple-50 dark:hover:bg-deep-purple-900/20"
};

export default function GeoButton({onClick, icon, text, variant = 'primary', isLoading}: GeoButtonProps) {
    return (
        <Button
            className={cn(
                "w-full h-full flex justify-center items-center gap-2 px-5 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-103 active:scale-95",
                variantStyles[variant]
            )}
            onClick={onClick}
            disabled={isLoading}
        >
            {isLoading? <Spinner/> : icon} {text}
        </Button>
    );
}
