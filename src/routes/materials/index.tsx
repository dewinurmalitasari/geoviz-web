import {createFileRoute} from '@tanstack/react-router'
import PageHeader from "@/components/root/page-header.tsx";
import {ApiError} from "@/lib/api-client.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import {LoadingPage} from "@/components/root/loading-page.tsx";
import {materialService} from "@/services/material-service.ts";
import {useEffect} from "react";

export const Route = createFileRoute('/materials/')({
    component: RouteComponent,
    pendingComponent: () => <LoadingPage page="Materi"/>,
    loader: async () => {
        const materialsResponse = await materialService.getMaterials(true)
        const materials = materialsResponse.materials;
        return {materials};
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
    const {materials} = Route.useLoaderData();

    // TODO: Remove this useEffect after development
    useEffect(() => {
        console.log(materials);
    }, [materials]);

    return (
        <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
            <PageHeader title="Materi" description="Pelajari konsep-konsep transformasi geometri"/>
        </div>
    );
}
