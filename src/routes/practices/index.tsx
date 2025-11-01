import {createFileRoute, notFound} from '@tanstack/react-router'
import PageHeader from "@/components/root/page-header.tsx";
import {getAuthentication} from "@/lib/auth.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";

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
            <PageHeader title="Latihan" description="Latihan soal untuk menguji pemahamanmu"/>
        </div>
    );

}
