import {createFileRoute} from '@tanstack/react-router'
import PageHeader from "@/components/root/page-header.tsx";
import {LoadingPage} from "@/components/root/loading-page.tsx";
import {ApiError} from "@/lib/api-client.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import {practicesService} from "@/services/practices-service.ts";
import {type Practice} from "@/type.ts";
import GeoCard from "@/components/geo/geo-card.tsx";
import {BookCheck, CheckCircle, XCircle} from "lucide-react";
import {DataTable} from "@/components/table/data-table.tsx";
import {usePracticeResultColumns} from '@/components/table/practice/result.tsx';
import {cn} from '@/lib/utils.ts';

export const Route = createFileRoute('/practices/result/$practiceId')({
    component: RouteComponent,
    pendingComponent: () => <LoadingPage page="Hasil Latihan"/>,
    loader: async ({params}) => {
        const practiceResponse = await practicesService.getPractice(params.practiceId);
        const practice: Practice = practiceResponse.practice;
        return {practice};
    },
    errorComponent: ({error}) => {
        if (error instanceof ApiError) {
            return (
                <ErrorPage
                    status={error.status}
                    statusText={error.statusText}
                    title="Terjadi Kesalahan memuat data latihan"
                    message={error.message || "Gagal memuat data latihan."}
                />
            );
        }

        return (
            <ErrorPage
                status={500}
                statusText="Internal Server Error"
                title="Terjadi Kesalahan memuat data latihan"
                message={error.message || "Gagal memuat data latihan."}
            />
        );
    }
})

function RouteComponent() {
    const {practice} = Route.useLoaderData();
    const practiceResultColumns = usePracticeResultColumns();

    const formatter = new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    const percentage = (practice.score.correct / practice.score.total) * 100;
    const scoreColor = percentage >= 80 ? "text-green-600" : percentage >= 60 ? "text-yellow-600" : "text-red-600";
    const scoreBgColor = percentage >= 80 ? "bg-green-50" : percentage >= 60 ? "bg-yellow-50" : "bg-red-50";

    return (
        <div className="flex flex-col flex-grow px-4 md:px-16 space-y-6">
            <PageHeader
                title={`Hasil Latihan ${practice.code.translatePracticeType()}`}
                description={`Latihan dikerjakan pada ${formatter.format(new Date(practice.createdAt))}`}
                colorScheme="teal"
            />

            {/* Score Summary Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <GeoCard
                    icon={<BookCheck className="text-blue-600"/>}
                    title="Total Soal"
                    content={
                        <div className="text-3xl font-bold text-center text-gray-700 dark:text-gray-200">
                            {practice.score.total}
                        </div>
                    }
                    className="text-center"
                />

                <GeoCard
                    icon={<CheckCircle className="text-green-600"/>}
                    title="Jawaban Benar"
                    content={
                        <div className="text-3xl font-bold text-center text-green-600">
                            {practice.score.correct}
                        </div>
                    }
                    className="text-center"
                />

                <GeoCard
                    icon={<XCircle className="text-red-600"/>}
                    title="Jawaban Salah"
                    content={
                        <div className="text-3xl font-bold text-center text-red-600">
                            {practice.score.total - practice.score.correct}
                        </div>
                    }
                    className="text-center"
                />
            </div>

            {/* Overall Score Card */}
            <GeoCard
                title="Nilai Akhir"
                content={
                    <div className={cn(
                        "text-center py-6 rounded-lg",
                        scoreBgColor,
                        scoreColor
                    )}>
                        <div className="text-4xl font-bold mb-2">
                            {percentage.toFixed(0)}%
                        </div>
                        <div className="text-lg font-semibold">
                            {practice.score.correct} / {practice.score.total} Soal
                        </div>
                        <div className="text-sm mt-2 opacity-75">
                            {percentage >= 80 ? "Sangat Baik" :
                                percentage >= 60 ? "Cukup Baik" : "Perlu Belajar Lagi"}
                        </div>
                    </div>
                }
            />

            {/* Answers Table */}
            <GeoCard
                icon={<BookCheck/>}
                title="Detail Jawaban"
                content={
                    <DataTable
                        columns={practiceResultColumns}
                        data={practice.content.answers ?? []}
                    />
                }
                className="flex-1"
            />
        </div>
    );
}