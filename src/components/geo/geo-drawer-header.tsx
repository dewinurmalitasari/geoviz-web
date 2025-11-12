import {DrawerHeader, DrawerTitle} from "@/components/ui/drawer.tsx"
import type {ReactNode} from "react"
import {cn} from "@/lib/utils";
import type {ColorScheme} from "@/lib/color-scheme";
import {colorMap, DEFAULT_COLOR_SCHEME} from "@/lib/color-scheme";

interface GeoDrawerHeaderProps {
    icon: ReactNode
    title: string
    colorScheme?: ColorScheme
}

export default function GeoDrawerHeader({icon, title, colorScheme = DEFAULT_COLOR_SCHEME}: GeoDrawerHeaderProps) {
    const colors = colorMap[colorScheme];

    return (
        <>
            <div
                className={cn("h-2 bg-gradient-to-r -mx-6 -mt-6.5 mb-4 rounded-t-lg", colors.topLine)}
            />
            <DrawerHeader>
                <div className="flex items-center gap-4">
                    <div
                        className={cn("w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center", colors.iconBg)}
                    >
                        {icon}
                    </div>
                    <DrawerTitle className={cn("text-2xl font-bold", colors.label)}>
                        {title}
                    </DrawerTitle>
                </div>
            </DrawerHeader>
        </>
    )
}