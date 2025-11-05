import {createFileRoute, notFound} from '@tanstack/react-router'
import PageHeader from "@/components/root/page-header.tsx";
import {getAuthentication} from "@/lib/auth.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import GeoCard from "@/components/geo/geo-card.tsx";
import {ArrowRight} from "lucide-react";
import GeoButton from "@/components/geo/geo-button.tsx";
import {ROUTES} from "@/type.ts";

export const Route = createFileRoute('/practices/')({
    loader: () => {
        const auth = getAuthentication();
        if (auth?.user.role !== "student") {
            throw notFound()
        }
    },
    component: RouteComponent,
    notFoundComponent: () => {
        return <ErrorPage
            status={404}
            statusText="Not Found"
            title="Halaman Tidak ditemukan"
            message="Halaman yang Anda cari tidak ditemukan."
        />;
    }
})

function RouteComponent() {
    return (
        <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
            <PageHeader title="Latihan" description="Latihan soal untuk menguji pemahamanmu" colorScheme="blue"/>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <GeoCard
                    icon={<span className="font-bold text-2xl">1</span>}
                    title="Identifikasi Jenis Transformasi"
                    content={
                        <p className="text-gray-600 mb-6 text-sm md:text-base">
                            Latih kemampuanmu dalam mengidentifikasi jenis transformasi geometri.
                        </p>
                    }
                    footer={
                        <GeoButton variant="primary" to={ROUTES.practices.base}>
                            <ArrowRight className="w-4 h-4"/> Latihan Identifikasi
                        </GeoButton>
                    }
                    data-aos-delay={100}
                />

                <GeoCard
                    icon={<span className="font-bold text-2xl">2</span>}
                    title="Tentukan Nilai Transformasi"
                    content={
                        <p className="text-gray-600 mb-6 text-sm md:text-base">
                            Latih kemampuanmu dalam mennentukan nilai transformasi geometri.
                        </p>
                    }
                    footer={
                        <GeoButton variant="primary" to={ROUTES.practices.base}>
                            <ArrowRight className="w-4 h-4"/> Latihan Nilai Transformasi
                        </GeoButton>
                    }
                    data-aos-delay={200}
                />
            </div>

        </div>
    );

}
