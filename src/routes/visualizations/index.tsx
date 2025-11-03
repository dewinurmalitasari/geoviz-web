import {createFileRoute} from '@tanstack/react-router'
import PageHeader from "@/components/root/page-header.tsx";
import {ArrowRight, Box, Radical, Square} from "lucide-react";
import GeoButton from "@/components/geo/geo-button.tsx";
import {ROUTES} from "@/type.ts";
import GeoCard from "@/components/geo/geo-card.tsx";

export const Route = createFileRoute('/visualizations/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
            <PageHeader title="Visualization" description="Visualisasi transformasi geometri"/>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <GeoCard
                    icon={<Square/>}
                    title="Bangun 2D"
                    content={
                        <p className="text-gray-600 mb-6 text-sm md:text-base">
                            Lihat visualisasi transformasi geometri pada bangun datar 2D.
                        </p>
                    }
                    footer={
                        <GeoButton variant="primary" to={ROUTES.visualizations.shape2d}>
                            <ArrowRight className="w-4 h-4"/> Visualisasi Bangun 2D
                        </GeoButton>
                    }
                />

                <GeoCard
                    icon={<Box/>}
                    title="Bangun 3D"
                    content={
                        <p className="text-gray-600 mb-6 text-sm md:text-base">
                            Lihat visualisasi transformasi geometri pada bangun ruang 3D.
                        </p>
                    }
                    footer={
                        <GeoButton variant="primary" to={ROUTES.visualizations.shape2d}>
                            <ArrowRight className="w-4 h-4"/> Visualisasi Bangun 3D
                        </GeoButton>
                    }
                />

                <GeoCard
                    icon={<Radical/>}
                    title="Persamaan"
                    content={
                        <p className="text-gray-600 mb-6 text-sm md:text-base">
                            Lihat visualisasi transformasi geometri pada persamaan matematika.
                        </p>
                    }
                    footer={
                        <GeoButton variant="primary" to={ROUTES.visualizations.shape2d}>
                            <ArrowRight className="w-4 h-4"/> Visualisasi Persamaan
                        </GeoButton>
                    }
                />
            </div>
        </div>
    );
}
