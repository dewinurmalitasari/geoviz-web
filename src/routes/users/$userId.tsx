import {createFileRoute} from '@tanstack/react-router'
import {LoadingPage} from "@/components/root/loading-page.tsx";
import {userService} from "@/services/user-service.ts";
import {ApiError} from "@/lib/api-client.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";

export const Route = createFileRoute('/users/$userId')({
    component: RouteComponent,
    pendingComponent: () => <LoadingPage page="Detail Siswa"/>,
    loader: async ({params}) => {
        const user = await userService.getUser(params.userId);
        return {user};
    },
    errorComponent: ({ error }) => {
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
})

function RouteComponent() {
    // TODO: Check if the user role is not student, redirect to /users
    // TODO: Fetch user detail on loader or before load, while tables and statistics show skeletons
    // TODO: Make sure to throw 404 if user not found
    const {user} = Route.useLoaderData();

    return (
        <div>
            <h1>User Detail Page</h1>
            {user && (
                <div>
                    <p>User ID: {user.user._id}</p>
                    <p>Username: {user.user.username}</p>
                    <p>Role: {user.user.role}</p>
                </div>
            )}
        </div>
    )
}
