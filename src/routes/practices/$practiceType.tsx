import {createFileRoute, notFound} from '@tanstack/react-router'
import {getAuthentication} from "@/lib/auth.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import {PRACTICE_TYPES} from "@/type.ts";
import IdentifyPractice from "@/components/practice/identify-practice.tsx";

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
    const {practiceType} = Route.useParams()

    // TODO: Update to render based on practiceType
    switch (practiceType) {
        case PRACTICE_TYPES.IDENTIFY:
            return <IdentifyPractice/>
        case PRACTICE_TYPES.DETERMINE_VALUE:
            return <div>TODO</div> // TODO: This guy should display the transforation type and ask for value
        default:
            return null;
    }
}
