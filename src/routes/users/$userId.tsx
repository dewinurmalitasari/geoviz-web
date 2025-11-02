import {createFileRoute, notFound} from '@tanstack/react-router'
import {LoadingPage} from "@/components/root/loading-page.tsx";
import {userService} from "@/services/user-service.ts";
import {ApiError} from "@/lib/api-client.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import PageHeader from "@/components/root/page-header.tsx";
import {getAuthentication} from "@/lib/auth.ts";
import {practicesService} from "@/services/practices-service.ts";
import {statisticsService} from "@/services/statistics-service.ts";
import GeoCard from "@/components/geo/geo-card.tsx";
import {BookOpenCheck, ChartColumn} from "lucide-react";
import {DataTable} from "@/components/table/data-table.tsx";
import {usePracticeColumns, useStatisticsColumns} from "@/components/table/users/$userId.tsx";
import UserSummary from "@/components/user/user-summary.tsx";

export const Route = createFileRoute('/users/$userId')({
    component: RouteComponent,
    pendingComponent: () => <LoadingPage page="Detail Siswa"/>,
    loader: async ({params}) => {
        const auth = getAuthentication()
        const isStudent = auth?.user.role === 'student';
        if (isStudent && auth.user._id !== params.userId) {
            throw notFound()
        }

        const userResponse = await userService.getUser(params.userId);
        const practicesResponse = await practicesService.getPractices(params.userId);
        // Don't fetch statistics if the user is a student
        if (!isStudent) {
            const statisticsResponse = await statisticsService.getStatistics(params.userId);
            const statisticsSummaryResponse = await statisticsService.getStatisticsSummary(params.userId);

            return {userResponse, practicesResponse, statisticsResponse, statisticsSummaryResponse};
        }

        return {userResponse, practicesResponse};
    },
    errorComponent: ({error}) => {
        if (error instanceof ApiError) {
            return (
                <ErrorPage
                    status={error.status}
                    statusText={error.statusText}
                    title="Terjadi Kesalahan memuat data pengguna"
                    message={error.message || "Gagal memuat data pengguna."}
                />
            );
        }

        return (
            <ErrorPage
                status={500}
                statusText="Internal Server Error"
                title="Terjadi Kesalahan memuat data pengguna"
                message={error.message || "Gagal memuat data pengguna."}
            />
        );
    },
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
    const isStudent = getAuthentication()?.user.role === 'student';
    const {userResponse, practicesResponse, statisticsResponse, statisticsSummaryResponse} = Route.useLoaderData();

    // Column definitions
    const practicesResponseColumns = usePracticeColumns();
    const statisticsColumns = useStatisticsColumns();

    return (
        <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
            <PageHeader
                title={isStudent ? 'Histori Latihan' : `Detail ${userResponse ? userResponse.user.username : 'Siswa'}`}
                description={isStudent ? 'Informasi histori latihan soal.' : 'Informasi lengkap mengenai siswa.'}
            />

            <div className="flex flex-col flex-grow space-y-4">
                {statisticsSummaryResponse &&
                    <UserSummary summary={statisticsSummaryResponse.summary}/>
                }

                {statisticsResponse &&
                    <GeoCard
                        icon={<ChartColumn/>}
                        title="Statistik Siswa"
                        content={
                            <DataTable
                                columns={statisticsColumns}
                                data={statisticsResponse.statistics ?? []}
                            />
                        }
                        className="flex-1"
                    />
                }

                <GeoCard
                    icon={<BookOpenCheck/>}
                    title="Histori Latihan Soal"
                    content={
                        <DataTable
                            columns={practicesResponseColumns}
                            data={practicesResponse.practices ?? []}
                        />
                    }
                />
            </div>
        </div>
    )
}
