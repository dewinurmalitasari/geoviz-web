import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {cn} from "@/lib/utils";
import type {ReactNode} from "react";
import { colorMap, DEFAULT_COLOR_SCHEME, type ColorScheme } from "@/lib/color-scheme";

interface GeoTabsProps {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    tabs: Array<{
        value: string;
        label: string;
        icon?: ReactNode;
        disabled?: boolean;
        content: ReactNode;
    }>;
    className?: string;
    colorScheme?: ColorScheme;
    variant?: 'default' | 'pills' | 'underline';
    fullWidth?: boolean;
    orientation?: 'horizontal' | 'vertical';
}

export default function GeoTabs(
    {
        defaultValue,
        value,
        onValueChange,
        tabs,
        className,
        colorScheme = DEFAULT_COLOR_SCHEME,
        variant = 'default',
        fullWidth = false,
        orientation = 'horizontal'
    }: GeoTabsProps) {
    const colors = colorMap[colorScheme];

    const getTabsListClass = () => {
        return cn(
            "inline-flex items-center justify-start rounded-lg bg-muted p-1 flex-wrap",
            "flex-shrink-0 min-w-0",
            fullWidth && "flex-1",
            orientation === 'vertical' && "flex-col items-stretch h-auto",
            fullWidth && "w-full",
            variant === 'underline' && "bg-transparent gap-2 p-0 border-b",
            variant === 'pills' && "bg-transparent gap-2 p-0"
        );
    };

    const getTabTriggerClass = () => {
        const baseClasses = cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow cursor-pointer",
            fullWidth && "flex-1",
        );

        switch (variant) {
            case 'pills':
                return cn(
                    baseClasses,
                    "px-4 py-2 border",
                    colors.pills,
                    "data-[state=inactive]:border-deep-purple-200 data-[state=inactive]:hover:border-deep-purple-300"
                );
            case 'underline':
                return cn(
                    baseClasses,
                    "bg-transparent px-1 py-2 shadow-none data-[state=active]:shadow-none border-b-2",
                    colors.underline,
                    "data-[state=inactive]:border-transparent"
                );
            default:
                return cn(
                    baseClasses,
                    "px-3 py-2",
                    // Default variant: border for inactive tabs
                    "data-[state=inactive]:border data-[state=inactive]:border-deep-purple-200 data-[state=inactive]:hover:border-deep-purple-300",
                    colors.inactive,
                    // Active state overrides
                    "data-[state=active]:border-transparent data-[state=active]:shadow-lg",
                    colors.active
                );
        }
    };

    const tabsContentClass = cn(
        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        orientation === 'vertical' && "ml-4",
    );

    return (
        <Tabs
            defaultValue={defaultValue}
            value={value}
            onValueChange={onValueChange}
            className={cn(
                "w-full",
                orientation === 'vertical' && "flex gap-4",
                className
            )}
            orientation={orientation}
        >
            <TabsList className={getTabsListClass()}>
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        disabled={tab.disabled}
                        className={getTabTriggerClass()}
                    >
                        {tab.icon && (
                            <div className="mr-2 flex-shrink-0">
                                {tab.icon}
                            </div>
                        )}
                        <span className="whitespace-nowrap">
                            {tab.label}
                        </span>
                    </TabsTrigger>
                ))}
            </TabsList>

            {tabs.map((tab) => (
                <TabsContent
                    key={tab.value}
                    value={tab.value}
                    className={tabsContentClass}
                >
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    );
}