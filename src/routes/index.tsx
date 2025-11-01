import {createFileRoute} from '@tanstack/react-router'
import {getAuthentication} from "@/lib/auth.ts";
import GeoCard from "@/components/geo/geo-card.tsx";
import GeoButton from "@/components/geo/geo-button.tsx";
import {ArrowRight, BookOpen, Boxes, Pencil, User} from 'lucide-react';
import Progress from "@/components/root/progress.tsx";
import {ApiError} from "@/lib/api-client.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import {LoadingPage} from "@/components/root/loading-page.tsx";
import {statisticsService} from "@/services/statistics-service.ts";
import {type ProgressData, ROUTES, type StatisticsSummaryResponse} from "@/type.ts";
import PageHeader from "@/components/root/page-header.tsx";

export const Route = createFileRoute('/')({
    component: App,
    pendingComponent: () => <LoadingPage page="Dashboard"/>,
    loader: async () => {
        const auth = getAuthentication();
        if (auth?.user.role !== 'student') return {}

        const statisticsSummary: StatisticsSummaryResponse = await statisticsService.getStatisticsSummary(auth.user._id);

        const progress: ProgressData = {
            material: {
                total: statisticsSummary.summary.totalMaterialsUnique,
                accessed: Object.keys(statisticsSummary.summary.materialAccessCount).length,
                percent: statisticsSummary.summary.totalMaterialsUnique === 0
                    ? '0%'
                    : `${((Object.keys(statisticsSummary.summary.materialAccessCount).length / statisticsSummary.summary.totalMaterialsUnique) * 100).toFixed(2)}%`
            },
            practice: {
                total: statisticsSummary.summary.totalPracticesUnique,
                completed: statisticsSummary.summary.totalPracticesCompleted,
                percent: statisticsSummary.summary.totalPracticesUnique === 0
                    ? '0%'
                    : `${((statisticsSummary.summary.totalPracticesCompleted / statisticsSummary.summary.totalPracticesUnique) * 100).toFixed(2)}%`
            }
        }

        return {progress};
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
    const auth = getAuthentication();
    const {progress} = Route.useLoaderData();

    return (
        <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
            <PageHeader title="Dashboard" description="Selamat datang di aplikasi pembelajaran transformasi geometri!"
                        noBackButton/>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                            <GeoButton variant="primary" to={ROUTES.users.base}>
                                <ArrowRight className="w-4 h-4"/> Kelola Akun
                            </GeoButton>
                        }
                    />
                )}

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
                        <GeoButton variant="primary" to={ROUTES.materials.base}>
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
                        <GeoButton variant="primary" to={ROUTES.visualizations.base}>
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

                            <GeoButton variant="primary" to={ROUTES.practices.base}>
                                <ArrowRight className="w-4 h-4"/> Mulai Latihan
                            </GeoButton>
                        }
                    />
                }

            </div>

            {auth?.user.role === "student" && (
                <Progress progress={progress as ProgressData} _id={auth.user._id}/>
            )}
        </div>
    )
}