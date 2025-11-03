import {useAnimatedNavigation} from "@/hooks/use-animated-navigation.ts";
import GeoButton from "@/components/geo/geo-button.tsx";
import {ArrowLeft} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";

interface PageHeaderProps {
    title: string;
    description?: string;
    noBackButton?: boolean;
    additionalButtons?: React.ReactNode;
    colorScheme?: 'purple' | 'blue' | 'green' | 'red' | 'orange' | 'teal';
}

const colorMap = {
    purple: {
        from: "from-deep-purple-400",
        to: "to-deep-purple-600",
        textFrom: "from-deep-purple-600",
        textTo: "to-deep-purple-800",
        separatorFrom: "from-deep-purple-400",
        separatorTo: "to-deep-purple-600"
    },
    blue: {
        from: "from-blue-400",
        to: "to-blue-600",
        textFrom: "from-blue-600",
        textTo: "to-blue-800",
        separatorFrom: "from-blue-400",
        separatorTo: "to-blue-600"
    },
    green: {
        from: "from-green-400",
        to: "to-green-600",
        textFrom: "from-green-600",
        textTo: "to-green-800",
        separatorFrom: "from-green-400",
        separatorTo: "to-green-600"
    },
    red: {
        from: "from-red-400",
        to: "to-red-600",
        textFrom: "from-red-600",
        textTo: "to-red-800",
        separatorFrom: "from-red-400",
        separatorTo: "to-red-600"
    },
    orange: {
        from: "from-orange-400",
        to: "to-orange-600",
        textFrom: "from-orange-600",
        textTo: "to-orange-800",
        separatorFrom: "from-orange-400",
        separatorTo: "to-orange-600"
    },
    teal: {
        from: "from-teal-400",
        to: "to-teal-600",
        textFrom: "from-teal-600",
        textTo: "to-teal-800",
        separatorFrom: "from-teal-400",
        separatorTo: "to-teal-600"
    },
};

export default function PageHeader(
    {
        title,
        description,
        noBackButton,
        additionalButtons,
        colorScheme = 'purple'
    }: PageHeaderProps) {
    const animatedNavigate = useAnimatedNavigation();
    const colors = colorMap[colorScheme];

    return (
        <div className="mt-6" data-aos="zoom-in">
            <div className="bg-white rounded-2xl shadow-lg border border-deep-purple-100 overflow-hidden w-full">
                <div className={`h-2 bg-gradient-to-r ${colors.from} ${colors.to}`}></div>

                <div className="p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
                        <div>
                            <h1 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${colors.textFrom} ${colors.textTo} bg-clip-text text-transparent`}>
                                {title}
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                {description}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                            {!noBackButton &&
                                <GeoButton
                                    onClick={() => animatedNavigate({}, true)}
                                    variant="primary"
                                    colorScheme={colorScheme}
                                    className="w-full sm:w-auto whitespace-nowrap"
                                >
                                    <ArrowLeft className="w-4 h-4"/> Kembali
                                </GeoButton>
                            }
                            {additionalButtons}
                        </div>
                    </div>
                </div>
            </div>
            <Separator className={`mt-4 bg-gradient-to-r ${colors.separatorFrom} ${colors.separatorTo} rounded-full`}/>
        </div>
    );
}