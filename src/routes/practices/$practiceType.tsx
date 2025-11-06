import {createFileRoute, notFound} from '@tanstack/react-router'
import {getAuthentication} from "@/lib/auth.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import PageHeader from "@/components/root/page-header.tsx";
import {PRACTICE_TYPES} from "@/type.ts";

export const Route = createFileRoute('/practices/$practiceType')({
    beforeLoad: ({params}) => {
        // Check if practiceType is valid by comparing with PRACTICE_TYPES
        const validTypes = Object.values(PRACTICE_TYPES) as string[];
        if (!validTypes.includes(params.practiceType)) {
            throw new Error('Not Found');
        }
    },
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
    },
    errorComponent: ({error}) => {
        if (error.message === 'Not Found') {
            return (
                <ErrorPage
                    status={404}
                    statusText="Not Found"
                    title="Halaman Tidak ditemukan"
                    message="Halaman yang Anda cari tidak ditemukan."
                />
            )
        }

        return (
            <ErrorPage
                status={500}
                statusText="Internal Server Error"
                title="Terjadi Kesalahan memuat visualisasi"
                message={error.message || "Gagal memuat visualisasi."}
            />
        );
    },
})

function RouteComponent() {
    const { practiceType } = Route.useParams()

    return <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
        <PageHeader title={`Latihan ${practiceType.translatePracticeType()}`} description="Lakukan latihan soal sesuai instruksi" colorScheme="blue"/>
    </div>
}
