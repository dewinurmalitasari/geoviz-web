import {createFileRoute, useNavigate, useRouter} from '@tanstack/react-router'
import {LoadingPage} from "@/components/root/loading-page.tsx";
import {materialService} from "@/services/material-service.ts";
import {ApiError} from "@/lib/api-client.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import PageHeader from "@/components/root/page-header.tsx";
import GeoCard from "@/components/geo/geo-card.tsx";
import {BookOpen, Calculator, Lightbulb, Pen} from "lucide-react";
import {useState} from "react";
import EditMaterialForm from "@/components/form/material/edit-material-form.tsx";
import DeleteMaterialForm from "@/components/form/material/delete-material-form.tsx";
import GeoButton from "@/components/geo/geo-button.tsx";
import {getAuthentication} from "@/lib/auth.ts";

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
    const auth = getAuthentication();
    const router = useRouter();
    const navigate = useNavigate();
    const {material} = Route.useLoaderData();

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
            <PageHeader title={material.title} description="Detail materi transformasi geometri" colorScheme="yellow"/>

            <GeoCard
                icon={<BookOpen/>}
                title={material.title}
                content={
                    <div className="space-y-6">
                        {/* Description */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <BookOpen className="w-5 h-5 text-deep-purple-600"/>
                                <h3 className="text-lg font-semibold text-deep-purple-700">Deskripsi</h3>
                            </div>
                            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-deep-purple-300 whitespace-pre-line">
                                {material.description}
                            </p>
                        </div>

                        {/* Formula */}
                        {material.formula && (
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Calculator className="w-5 h-5 text-green-600"/>
                                    <h3 className="text-lg font-semibold text-deep-purple-700">Rumus</h3>
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <p className="font-mono text-lg text-gray-800 text-center font-medium whitespace-pre-line">
                                        {material.formula}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Example */}
                        {material.example && (
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Lightbulb className="w-5 h-5 text-amber-600"/>
                                    <h3 className="text-lg font-semibold text-deep-purple-700">Contoh</h3>
                                </div>
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {material.example}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                }
                titleButton={auth?.user.role === 'admin' &&
                    <GeoButton
                        onClick={() => setEditOpen(true)}
                        variant="secondary"
                    >
                        <Pen/> Edit
                    </GeoButton>
                }
            />

            <EditMaterialForm
                open={editOpen}
                setOpen={setEditOpen}
                material={material}
                onSuccess={() => {
                    router.invalidate();
                }}
                onDeleteClick={() => {
                    setDeleteOpen(true);
                }}
            />

            <DeleteMaterialForm
                open={deleteOpen}
                onOpenChange={() => {
                    setDeleteOpen(false);
                    navigate({to: '..'});
                }}
                material={material}
                onSuccess={() => {
                    router.invalidate();
                }}
            />
        </div>
    );
}