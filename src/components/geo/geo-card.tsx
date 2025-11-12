import type {ReactNode} from "react";
import {cn} from "@/lib/utils.ts";
import { colorMap, DEFAULT_COLOR_SCHEME, type ColorScheme } from "@/lib/color-scheme";

interface GeoCardProps {
    icon?: ReactNode;
    title?: string;
    content?: ReactNode;
    footer?: ReactNode;
    header?: ReactNode;
    className?: string;
    'data-aos-delay'?: number;
    colorScheme?: ColorScheme;
}

export default function GeoCard(
    {
        icon,
        title,
        content,
        footer,
        header,
        className,
        colorScheme = DEFAULT_COLOR_SCHEME,
        'data-aos-delay': dataAosDelay
    }: GeoCardProps) {
    const colors = colorMap[colorScheme];

    return (
        <div
            className={cn(
                "bg-white rounded-2xl shadow-lg overflow-hidden card-hover w-full flex flex-col",
                colors.border,
                className
            )}
            data-aos="zoom-in"
            data-aos-delay={dataAosDelay}
        >
            <div className={`h-2 bg-gradient-to-r ${colors.topLine}`}></div>

            <div className="p-4 md:p-8 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center min-w-0 flex-1 w-full mb-2 md:mb-0">
                            {icon &&
                                <div
                                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.iconBg} flex items-center justify-center mr-4 shrink-0`}>
                                    {icon}
                                </div>
                            }
                            {title &&
                                <div className="min-w-0 flex-1">
                                    <h2 className={cn(
                                        "text-2xl font-extrabold line-clamp-2 break-words overflow-hidden",
                                        colors.title
                                    )}>
                                        {title}
                                    </h2>
                                </div>
                            }
                        </div>

                        {header && <div className="w-full md:w-fit">{header}</div>}
                    </div>

                    {content}
                </div>

                {footer && <div>{footer}</div>}
            </div>
        </div>
    );
}