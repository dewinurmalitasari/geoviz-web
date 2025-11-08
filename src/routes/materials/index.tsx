import {createFileRoute, useRouter} from '@tanstack/react-router'
import PageHeader from "@/components/root/page-header.tsx";
import {ApiError} from "@/lib/api-client.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import {LoadingPage} from "@/components/root/loading-page.tsx";
import {materialService} from "@/services/material-service.ts";
import GeoCard from "@/components/geo/geo-card.tsx";
import {type Material, ROUTES} from "@/type.ts";
import {Eye, Pen, Plus} from "lucide-react";
import GeoButton from "@/components/geo/geo-button.tsx";
import {getAuthentication} from "@/lib/auth.ts";
import {useState} from "react";
import EditMaterialForm from "@/components/form/material/edit-material-form.tsx";
import DeleteMaterialForm from "@/components/form/material/delete-material-form.tsx";
import AddMaterialForm from "@/components/form/material/add-material-form.tsx";
import {useIsMobile} from "@/hooks/use-mobile.ts";
import he from "he";
import {statisticsService} from "@/services/statistics-service.ts";

export const Route = createFileRoute('/materials/')({
    component: RouteComponent,
    pendingComponent: () => <LoadingPage page="Materi"/>,
    loader: async () => {
        const materialsResponse = await materialService.getMaterials()
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
    const router = useRouter();
    const auth = getAuthentication()
    const {materials} = Route.useLoaderData();

    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const isMobile = useIsMobile()

    return (
        <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
            <PageHeader
                title="Materi"
                description="Pelajari konsep-konsep transformasi geometri"
                additionalButtons={
                    auth?.user.role === 'admin' &&
                    <AddMaterialForm
                        onSuccess={() => router.invalidate()}
                        trigger={
                            <GeoButton
                                variant="secondary"
                                className="flex-1"
                            >
                                <Plus/> Tambah Materi
                            </GeoButton>
                        }
                    />
                }
                colorScheme="yellow"
            />

            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {materials.map((material, index) => (
                    <GeoCard
                        key={index}
                        icon={<span className="font-bold text-2xl">{index + 1}</span>}
                        title={he.decode(material.title)}
                        content={
                            <p className="line-clamp-3 break-words overflow-hidden">
                                {he.decode(material.description)}
                            </p>
                        }
                        footer={
                            <div className="flex flex-col items-center justify-between gap-2">
                                <GeoButton
                                    to={ROUTES.materials.materialDetail(material._id)}
                                    onClick={async () => {
                                        // Record statistic for material view
                                        if (auth?.user.role !== 'student') return;

                                        await statisticsService.recordStatistic({
                                            type: "material",
                                            data: {
                                                title: material.title,
                                                material: material._id,
                                            },
                                        });
                                    }}
                                    variant="primary">
                                    <Eye/> Lihat
                                </GeoButton>

                                {auth?.user.role === 'admin' &&
                                    <GeoButton
                                        onClick={() => {
                                            setSelectedMaterial(material);
                                            setEditOpen(true);
                                        }}
                                        variant="secondary"
                                    >
                                        <Pen/> Edit
                                    </GeoButton>
                                }
                            </div>
                        }
                        data-aos-delay={isMobile ? 0 : ((index % 4) * 100)}
                    />
                ))}
            </div>

            {selectedMaterial && (
                <EditMaterialForm
                    open={editOpen}
                    setOpen={setEditOpen}
                    material={selectedMaterial}
                    onSuccess={() => {
                        setSelectedMaterial(null);
                        router.invalidate();
                    }}
                    onDeleteClick={() => {
                        setDeleteOpen(true);
                    }}
                />
            )}

            {selectedMaterial && (
                <DeleteMaterialForm
                    open={deleteOpen}
                    onOpenChange={() => {
                        setDeleteOpen(false);
                    }}
                    material={selectedMaterial}
                    onSuccess={() => {
                        setSelectedMaterial(null);
                        router.invalidate();
                    }}
                />
            )}
        </div>
    );
}
