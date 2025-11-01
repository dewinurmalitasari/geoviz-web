import {createFileRoute, notFound} from '@tanstack/react-router'
import {getAuthentication} from "@/lib/auth.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";

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

    return <div>Hello "/practice/{practiceType}"!</div>
}
