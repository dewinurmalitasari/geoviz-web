import {createFileRoute} from '@tanstack/react-router'
import {LoadingPage} from "@/components/root/loading-page.tsx";
import {materialService} from "@/services/material-service.ts";
import {ApiError} from "@/lib/api-client.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import PageHeader from "@/components/root/page-header.tsx";

export const Route = createFileRoute('/materials/$materialId')({
    component: RouteComponent,
    pendingComponent: () => <LoadingPage page="Detail Materi"/>,
    loader: async ({params}) => {
        const materialResponse = await materialService.getMaterial(params.materialId);
        const material = materialResponse.material;
        return {material};
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
    const {material} = Route.useLoaderData();

    // TODO: Style this page better
    return (
        <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
            <PageHeader title={material.title} description="Detail materi transformasi geometri" />

            <h1 className="text-3xl font-bold">{material.title}</h1>
            <p className="text-lg">{material.description}</p>
            {material.formula && (
                <div>
                    <h2 className="text-2xl font-semibold mt-4">Rumus</h2>
                    <p className="mt-2">{material.formula}</p>
                </div>
            )}
            {material.example && (
                <div>
                    <h2 className="text-2xl font-semibold mt-4">Contoh</h2>
                    <p className="mt-2">{material.example}</p>
                </div>
            )}
        </div>
    );
}
