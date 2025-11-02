import {createFileRoute} from '@tanstack/react-router'
import PageHeader from "@/components/root/page-header.tsx";
import {ApiError} from "@/lib/api-client.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import {LoadingPage} from "@/components/root/loading-page.tsx";
import {getAuthentication} from "@/lib/auth.ts";
import type {UsersResponse} from "@/type.ts";
import {userService} from "@/services/user-service.ts";

export const Route = createFileRoute('/materials/')({
    component: RouteComponent,
    pendingComponent: () => <LoadingPage page="Materi"/>,
    loader: async () => {
        const auth = getAuthentication(); // TODO

        // If user role is admin load teacher too
        let teachers: UsersResponse | null = null;
        if (auth?.user.role === 'admin') {
            teachers = await userService.getUsers('teacher');
        }

        const students = await userService.getUsers('student');

        return {students, teachers};
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
    return (
        <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
            <PageHeader title="Materi" description="Pelajari konsep-konsep transformasi geometri"/>
        </div>
    );
}
