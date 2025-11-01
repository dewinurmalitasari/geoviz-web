import {createFileRoute, notFound} from '@tanstack/react-router'
import {LoadingPage} from "@/components/root/loading-page.tsx";
import {userService} from "@/services/user-service.ts";
import {ApiError} from "@/lib/api-client.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import PageHeader from "@/components/root/page-header.tsx";
import {getAuthentication} from "@/lib/auth.ts";
import {practicesService} from "@/services/practices-service.ts";
import {statisticsService} from "@/services/statistics-service.ts";
import {useEffect, useMemo} from "react";
import GeoCard from "@/components/geo/geo-card.tsx";
import {BookOpenCheck, ChartColumn, ClipboardList, Eye} from "lucide-react";
import type {ColumnDef} from "@tanstack/react-table";
import type {Practice} from "@/type.ts";
import {DataTable} from "@/components/table/data-table.tsx";
import GeoButton from "@/components/geo/geo-button.tsx";

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

    useEffect(() => {
        console.log('User Detail:', userResponse);
        console.log('Practices:', practicesResponse);
        if (!isStudent) {
            console.log('Statistics:', statisticsResponse);
            console.log('Statistics Summary:', statisticsSummaryResponse);
        }
    }, [userResponse, practicesResponse, statisticsResponse, statisticsSummaryResponse, isStudent]);

    // Column definitions TODO
    const practicesResponseColumns: ColumnDef<Practice>[] = useMemo(() => [
        {
            id: 'createdAt',
            accessorFn: (row) => {
                const date = new Date(row.createdAt);
                const formatter = new Intl.DateTimeFormat('id-ID', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                });
                return formatter.format(date).replace(',', ' -');
            },
            header: () => <div className="text-center font-bold">Waktu</div>,
            cell: ({getValue}) => {
                return <div className="text-center">{getValue<string>()}</div>;
            },
        },
        {
            id: 'actions',
            header: () => <div className="text-end font-bold pe-10">Aksi</div>,
            cell: ({row}) => {
                return (
                    <div className="flex justify-end pe-4">
                        <GeoButton
                            to={`/practices/result/${row.original._id}`}
                            variant="primary"
                            className="h-[40px] w-[80px]"
                        >
                            <Eye/> Lihat
                        </GeoButton>
                    </div>
                );
            }
        }

    ], []);

    return (
        <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
            <PageHeader
                title={isStudent ? 'Histori Latihan' : `Detail ${userResponse ? userResponse.user.username : 'Siswa'}`}
                description={isStudent ? 'Informasi histori latihan soal.' : 'Informasi lengkap mengenai siswa.'}
            />

            <div className="flex flex-col flex-grow space-y-4">
                {/*TODO: Hide if user is student*/}
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 flex-grow">
                    <GeoCard
                        icon={<ClipboardList/>}
                        title="Ringkasan Siswa"
                        content={<></>}
                        className="flex-1"
                    />
                    <GeoCard
                        icon={<ChartColumn/>}
                        title="Statistik Siswa"
                        content={<></>}
                        className="flex-1"
                    />
                </div>

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
