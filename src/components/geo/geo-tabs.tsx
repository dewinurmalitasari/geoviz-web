import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {cn} from "@/lib/utils";
import type {ReactNode} from "react";

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
    colorScheme?: 'purple' | 'blue' | 'orange' | 'teal' | 'yellow' | 'maroon';
    variant?: 'default' | 'pills' | 'underline';
    fullWidth?: boolean;
    orientation?: 'horizontal' | 'vertical';
}

// TODO: Make this colormap the same across all geo-components
const colorMap = {
    purple: {
        active: "bg-gradient-to-r from-deep-purple-500 to-deep-purple-700 text-white shadow-md",
        inactive: "text-deep-purple-600 hover:bg-deep-purple-50 border border-deep-purple-200",
        pills: "text-deep-purple-600 hover:bg-deep-purple-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-deep-purple-500 data-[state=active]:to-deep-purple-700 data-[state=active]:text-white",
        underline: "border-b-2 border-transparent hover:border-deep-purple-300 data-[state=active]:border-deep-purple-500 text-deep-purple-600"
    },
    blue: {
        active: "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md",
        inactive: "text-blue-600 hover:bg-blue-50 border border-blue-200",
        pills: "text-blue-600 hover:bg-blue-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-700 data-[state=active]:text-white",
        underline: "border-b-2 border-transparent hover:border-blue-300 data-[state=active]:border-blue-500 text-blue-600"
    },
    orange: {
        active: "bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-md",
        inactive: "text-orange-600 hover:bg-orange-50 border border-orange-200",
        pills: "text-orange-600 hover:bg-orange-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-700 data-[state=active]:text-white",
        underline: "border-b-2 border-transparent hover:border-orange-300 data-[state=active]:border-orange-500 text-orange-600"
    },
    teal: {
        active: "bg-gradient-to-r from-teal-500 to-teal-700 text-white shadow-md",
        inactive: "text-teal-600 hover:bg-teal-50 border border-teal-200",
        pills: "text-teal-600 hover:bg-teal-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-teal-700 data-[state=active]:text-white",
        underline: "border-b-2 border-transparent hover:border-teal-300 data-[state=active]:border-teal-500 text-teal-600"
    },
    yellow: {
        active: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md",
        inactive: "text-yellow-600 hover:bg-yellow-50 border border-yellow-200",
        pills: "text-yellow-600 hover:bg-yellow-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white",
        underline: "border-b-2 border-transparent hover:border-yellow-300 data-[state=active]:border-yellow-500 text-yellow-600"
    },
    maroon: {
        active: "bg-gradient-to-r from-rose-600 to-rose-800 text-white shadow-md",
        inactive: "text-rose-600 hover:bg-rose-50 border border-rose-200",
        pills: "text-rose-600 hover:bg-rose-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-600 data-[state=active]:to-rose-800 data-[state=active]:text-white",
        underline: "border-b-2 border-transparent hover:border-rose-300 data-[state=active]:border-rose-600 text-rose-600"
    },
};

export default function GeoTabs(
    {
        defaultValue,
        value,
        onValueChange,
        tabs,
        className,
        colorScheme = 'purple',
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