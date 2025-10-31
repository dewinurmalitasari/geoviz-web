import {DrawerHeader, DrawerTitle} from "@/components/ui/drawer"
import type {ReactNode} from "react"

interface GeoDrawerHeaderProps {
    icon: ReactNode
    title: string
}

export default function GeoDrawerHeader({icon, title}: GeoDrawerHeaderProps) {
    return (
        <>
            <div
                className="h-2 bg-gradient-to-r from-deep-purple-400 to-deep-purple-600 -mx-6 -mt-6.5 mb-4 rounded-t-lg"/>
            <DrawerHeader>
                <div className="flex items-center gap-4">
                    <div
                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-deep-purple-100 to-deep-purple-200 flex items-center justify-center">
                        {icon}
                    </div>
                    <DrawerTitle className="text-2xl font-bold text-deep-purple-800">
                        {title}
                    </DrawerTitle>
                </div>
            </DrawerHeader>
        </>
    )
}
