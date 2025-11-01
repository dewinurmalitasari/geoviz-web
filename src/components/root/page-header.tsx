import GeoButton from "@/components/geo/geo-button.tsx";
import {ArrowLeft} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {useNavigate} from "@tanstack/react-router";

interface PageHeaderProps {
    title: string;
    description?: string;
}

export default function PageHeader({title, description}: PageHeaderProps) {
    const navigate = useNavigate();

    return (
        <div className="space-y-4 mt-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-deep-purple-600 to-deep-purple-800 bg-clip-text text-transparent">
                        {title}
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        {description}
                    </p>
                </div>
                <GeoButton
                    onClick={() => navigate({to: '..'})}
                    variant="primary"
                    className="w-full sm:w-auto whitespace-nowrap"
                >
                    <ArrowLeft className="w-4 h-4"/> Kembali
                </GeoButton>
            </div>
            <Separator className="mt-4 bg-gradient-to-r from-deep-purple-400 to-deep-purple-600 rounded-full" />
        </div>
    );
}
