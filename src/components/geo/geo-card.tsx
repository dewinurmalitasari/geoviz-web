import type {ReactNode} from "react";
import {cn} from "@/lib/utils.ts";

interface GeoCardProps {
    icon: ReactNode;
    title: string;
    content?: ReactNode;
    footer?: ReactNode;
    titleButton?: ReactNode;
    className?: string;
    'data-aos-delay'?: number;
    colorScheme?: 'purple' | 'blue' | 'orange' | 'teal' | 'yellow' | 'maroon';
}

const colorMap = {
    purple: {
        topLine: "from-deep-purple-400 to-deep-purple-600",
        iconBg: "from-deep-purple-100 to-deep-purple-200",
        title: "text-deep-purple-800",
        border: "border-deep-purple-100"
    },
    blue: {
        topLine: "from-blue-400 to-blue-600",
        iconBg: "from-blue-100 to-blue-200",
        title: "text-blue-800",
        border: "border-blue-100"
    },
    orange: {
        topLine: "from-orange-400 to-orange-600",
        iconBg: "from-orange-100 to-orange-200",
        title: "text-orange-800",
        border: "border-orange-100"
    },
    teal: {
        topLine: "from-teal-400 to-teal-600",
        iconBg: "from-teal-100 to-teal-200",
        title: "text-teal-800",
        border: "border-teal-100"
    },
    yellow: {
        topLine: "from-yellow-400 to-yellow-600",
        iconBg: "from-yellow-100 to-yellow-200",
        title: "text-yellow-800",
        border: "border-yellow-100"
    },
    maroon: {
        topLine: "from-rose-600 to-rose-800",
        iconBg: "from-rose-100 to-rose-200",
        title: "text-rose-800",
        border: "border-rose-100"
    },
};

export default function GeoCard(
    {
        icon,
        title,
        content,
        footer,
        titleButton,
        className,
        colorScheme = 'purple',
        'data-aos-delay': dataAosDelay
    }: GeoCardProps) {
    const colors = colorMap[colorScheme];

    return (
        <div
            className={cn(
                "bg-white rounded-2xl shadow-lg overflow-hidden card-hover w-full flex flex-col flex-grow",
                colors.border,
                className
            )}
            data-aos="zoom-in"
            data-aos-delay={dataAosDelay}
        >
            <div className={`h-2 bg-gradient-to-r ${colors.topLine}`}></div>

            <div className="p-6 md:p-8 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center min-w-0 flex-1">
                            <div
                                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.iconBg} flex items-center justify-center mr-4 shrink-0`}>
                                {icon}
                            </div>
                            <div className="min-w-0 flex-1">
                                <h2 className={cn(
                                    "text-2xl font-extrabold line-clamp-2 break-words overflow-hidden",
                                    colors.title
                                )}>
                                    {title}
                                </h2>
                            </div>
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