import type {ReactNode} from "react";
import {cn} from "@/lib/utils.ts";

interface GeoCardProps {
    icon: ReactNode;
    title: string;
    content?: ReactNode;
    footer?: ReactNode;
    titleButton?: ReactNode;
    className?: string;
}

export default function GeoCard({icon, title, content, footer, titleButton, className}: GeoCardProps) {
    return (
        <div
            className={cn(
                "bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100 w-full flex flex-col flex-grow",
                className
            )}
        >
            <div className="h-2 bg-gradient-to-r from-deep-purple-400 to-deep-purple-600"></div>

            <div className="p-6 md:p-8 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div
                                className="w-14 h-14 rounded-xl bg-gradient-to-br from-deep-purple-100 to-deep-purple-200 flex items-center justify-center mr-4">
                                {icon}
                            </div>
                            <h2 className="text-2xl font-bold text-deep-purple-800">{title}</h2>
                        </div>

                        {titleButton && <div>{titleButton}</div>}
                    </div>

                    {content}
                </div>

                {footer && <div>{footer}</div>}
            </div>
        </div>
    );
}
