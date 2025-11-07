import {createFileRoute} from '@tanstack/react-router'
import PageHeader from "@/components/root/page-header.tsx";
import {useEffect} from "react";
import {LoadingPage} from "@/components/root/loading-page.tsx";
import {ApiError} from "@/lib/api-client.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import {practicesService} from "@/services/practices-service.ts";
import {type Practice, PRACTICE_TYPES} from "@/type.ts";

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
                    title="Terjadi Kesalahan memuat data materi"
                    message={error.message || "Gagal memuat data materi."}
                />
            );
        }

        return (
            <ErrorPage
                status={500}
                statusText="Internal Server Error"
                title="Terjadi Kesalahan memuat data materi"
                message={error.message || "Gagal memuat data materi."}
            />
        );
    }
})

function RouteComponent() {
    const {practice} = Route.useLoaderData();
    const formatter = new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    useEffect(() => {
        console.log(practice);

        // Check if content exists first
        if (practice.content) {
            // Type narrowing based on practice code
            switch (practice.code) {
                case PRACTICE_TYPES.IDENTIFY:
                    // Type assertion to get proper typing
                    const identifyPractice = practice as Practice<'identify'>;
                    console.log(identifyPractice.content.answers);
                    break;
                case PRACTICE_TYPES.DETERMINE_VALUE:
                    // Type assertion to get proper typing
                    const determineValuePractice = practice as Practice<'determine_value'>;
                    console.log(determineValuePractice.content.values);
                    break;
                default:
                    // Type assertion to get proper typing
                    const defaultPractice = practice as Practice<'default'>;
                    console.log(defaultPractice.content.data);
                    break;
            }
        }
    }, [practice])

    return <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
        <PageHeader
            title={`Hasil Latihan ${practice.code.translatePracticeType()} - ${formatter.format(new Date(practice.createdAt))}`}
            description="Lihat hasil latihan soal yang telah dikerjakan"
            colorScheme="blue"
        />
    </div>
}
