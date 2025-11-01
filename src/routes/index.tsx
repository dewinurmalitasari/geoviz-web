import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {getAuthentication} from "@/lib/auth.ts";
import GeoCard from "@/components/geo/geo-card.tsx";
import GeoButton from "@/components/geo/geo-button.tsx";
import {ArrowRight, BookOpen, Boxes, Pencil, User} from 'lucide-react';
import Progress from "@/components/root/progress.tsx";
import {ApiError} from "@/lib/api-client.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import {LoadingPage} from "@/components/root/loading-page.tsx";
import {statisticsService} from "@/services/statistics-service.ts";
import {useEffect} from "react";

export const Route = createFileRoute('/')({
    component: App,
    pendingComponent: () => <LoadingPage page="Dashboard"/>,
    loader: async () => {
        const auth = getAuthentication();
        if (auth?.user.role !== 'student') return {}

        const statisticsSummary = await statisticsService.getStatisticsSummary(auth.user._id);
        return {statisticsSummary};
    },
    errorComponent: ({error}) => {
        if (error instanceof ApiError) {
            return (
                <ErrorPage
                    status={error.status}
                    statusText={error.statusText}
                    title="Terjadi Kesalahan memuat data"
                    message={error.message || "Gagal memuat data."}
                />
            );
        }

        return (
            <ErrorPage
                status={500}
                statusText="Internal Server Error"
                title="Terjadi Kesalahan memuat data"
                message={error.message || "Gagal memuat data."}
            />
        );
    }
})

function App() {
    const navigate = useNavigate();
    const auth = getAuthentication();
    const {statisticsSummary} = Route.useLoaderData();

    useEffect(() => {
        console.log(statisticsSummary);
    }, [statisticsSummary]);

    return (
        <div className="flex-grow px-4 md:px-16 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Materials Card */}
                <GeoCard
                    icon={<BookOpen/>}
                    title="Materi Pembelajaran"
                    content={
                        <p className="text-gray-600 mb-6 text-sm md:text-base">
                            Jelajahi konsep transformasi geometri dengan penjelasan yang mudah dipahami.
                        </p>
                    }
                    footer={
                        <GeoButton onClick={() => navigate({to: '/materials'})}
                                   variant="primary">
                            <ArrowRight className="w-4 h-4"/> Jelajahi Materi
                        </GeoButton>
                    }
                />

                {/* Visualization Card */}
                <GeoCard
                    icon={<Boxes/>}
                    title="Visualisasi 2D & 3D"
                    content={
                        <p className="text-gray-600 mb-6 text-sm md:text-base">
                            Jelajahi transformasi geometri dalam bentuk visual interaktif 2D dan 3D untuk pemahaman
                            yang lebih mendalam.
                        </p>
                    }
                    footer={
                        <GeoButton onClick={() => navigate({to: '/visualizations'})}
                                   variant="primary">
                            <ArrowRight className="w-4 h-4"/> Lihat Visualisasi
                        </GeoButton>
                    }
                />

                {/* Practice Card */}
                {auth?.user.role === "student" &&
                    <GeoCard
                        icon={<Pencil/>}
                        title="Latihan Soal"
                        content={
                            <p className="text-gray-600 mb-6 text-sm md:text-base">
                                Uji pemahaman Anda dengan berbagai latihan soal transformasi geometri yang menarik
                                dan
                                interaktif.
                            </p>
                        }
                        footer={
                            <GeoButton onClick={() => navigate({to: '/practices'})}
                                       variant="primary">
                                <ArrowRight className="w-4 h-4"/> Mulai Latihan
                            </GeoButton>
                        }
                    />
                }

                {/* Manage Account Card */}
                {(auth?.user.role === "admin" || auth?.user.role === "teacher") && (
                    <GeoCard
                        icon={<User/>}
                        title="Kelola Akun"
                        content={
                            <p className="text-gray-600 mb-6 text-sm md:text-base">
                                Kelola akun siswa {auth?.user.role === 'admin' ? 'dan guru' : ''}, serta melihat
                                statistik dan latihan siswa.
                            </p>
                        }
                        footer={
                            <GeoButton onClick={() => navigate({to: '/users'})}
                                       variant="primary">
                                <ArrowRight className="w-4 h-4"/> Kelola Akun
                            </GeoButton>
                        }
                    />
                )}

            </div>

            {auth?.user.role === "student" && (
                <Progress/>
            )}
        </div>
    )
}