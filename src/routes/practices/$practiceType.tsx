import {createFileRoute, notFound} from '@tanstack/react-router'
import {getAuthentication} from "@/lib/auth.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import PageHeader from "@/components/root/page-header.tsx";

export const Route = createFileRoute('/practices/$practiceType')({
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
    const { practiceType } = Route.useParams()

    return <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
        <PageHeader title={`Latihan ${practiceType}`} description="Lakukan latihan soal sesuai instruksi"/>
    </div>
}
