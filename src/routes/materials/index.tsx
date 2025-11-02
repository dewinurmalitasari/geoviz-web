import {createFileRoute} from '@tanstack/react-router'
import PageHeader from "@/components/root/page-header.tsx";
import {ApiError} from "@/lib/api-client.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import {LoadingPage} from "@/components/root/loading-page.tsx";
import {materialService} from "@/services/material-service.ts";
import {useEffect} from "react";
import GeoCard from "@/components/geo/geo-card.tsx";
import {ROUTES} from "@/type.ts";
import {Eye, Pen, Plus} from "lucide-react";
import GeoButton from "@/components/geo/geo-button.tsx";
import {getAuthentication} from "@/lib/auth.ts";
import {toast} from "sonner";

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
    const auth = getAuthentication()
    const {materials} = Route.useLoaderData();

    // TODO: Remove this useEffect after development
    useEffect(() => {
        console.log(materials);
    }, [materials]);

    return (
        <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
            <PageHeader
                title="Materi"
                description="Pelajari konsep-konsep transformasi geometri"
                additionalButtons={
                    auth?.user.role === 'admin' &&
                    <GeoButton
                        onClick={() => toast.warning('Not implemented yet!')}
                        variant="secondary"
                        className="flex-1"
                    >
                        <Plus/> Tambah Materi
                    </GeoButton>
                }
            />

            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {materials.map((material, index) => (
                    <GeoCard
                        key={index}
                        icon={<span className="font-bold text-2xl">{index + 1}</span>}
                        title={material.title}
                        content={
                            <p className="line-clamp-3 break-words overflow-hidden">
                                {material.description}
                            </p>
                        }
                        footer={
                            <div className="flex flex-col items-center justify-between gap-2">
                                <GeoButton
                                    to={ROUTES.materials.materialDetail(material._id)}
                                    variant="primary"
                                >
                                    <Eye/> Lihat
                                </GeoButton>

                                {auth?.user.role === 'admin' &&
                                    <GeoButton
                                        onClick={() => toast.warning('Not implemented yet!')}
                                        variant="secondary"
                                    >
                                        <Pen/> Edit
                                    </GeoButton>
                                }
                            </div>
                        }
                    />
                ))}
            </div>
        </div>
    );
}
