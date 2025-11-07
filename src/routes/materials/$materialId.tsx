import {createFileRoute, useNavigate, useRouter} from '@tanstack/react-router'
import {LoadingPage} from "@/components/root/loading-page.tsx";
import {materialService} from "@/services/material-service.ts";
import {ApiError} from "@/lib/api-client.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import PageHeader from "@/components/root/page-header.tsx";
import GeoCard from "@/components/geo/geo-card.tsx";
import {BookOpen, Calculator, Lightbulb, Pen, Video, Image} from "lucide-react";
import {useState} from "react";
import EditMaterialForm from "@/components/form/material/edit-material-form.tsx";
import DeleteMaterialForm from "@/components/form/material/delete-material-form.tsx";
import GeoButton from "@/components/geo/geo-button.tsx";
import {getAuthentication} from "@/lib/auth.ts";
import he from "he";

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
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Extract YouTube video IDs from links
    const youtubeVideoIds = material.youtubeLinks?.map(link => {
        const match = link.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
        return match ? match[1] : null;
    }).filter(Boolean) || [];

    return (
        <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
            <PageHeader title={he.decode(material.title)} description="Detail materi transformasi geometri" colorScheme="yellow"/>

            <GeoCard
                icon={<BookOpen/>}
                title={he.decode(material.title)}
                content={
                    <div className="space-y-6">
                        {/* YouTube Videos Section */}
                        {youtubeVideoIds.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Video className="w-5 h-5 text-red-600"/>
                                    <h3 className="text-lg font-semibold text-deep-purple-700">Video Pembelajaran</h3>
                                </div>
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 overflow-x-auto py-2">
                                    {youtubeVideoIds.map((videoId, index) => (
                                        <div key={index} className="w-full">
                                            <div className="aspect-video bg-black rounded-lg overflow-hidden">
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${videoId}`}
                                                    title={`YouTube video ${index + 1}`}
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <BookOpen className="w-5 h-5 text-deep-purple-600"/>
                                <h3 className="text-lg font-semibold text-deep-purple-700">Deskripsi</h3>
                            </div>
                            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-deep-purple-300 whitespace-pre-line">
                                {he.decode(material.description)}
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
                                        {he.decode(material.formula)}
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
                                        {he.decode(material.example)}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Images Section */}
                        {material.imageLinks && material.imageLinks.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Image className="w-5 h-5 text-blue-600"/>
                                    <h3 className="text-lg font-semibold text-deep-purple-700">Gambar Referensi</h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {material.imageLinks.map((imageUrl, index) => (
                                        <div
                                            key={index}
                                            className="overflow-hidden rounded-lg border border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                                            onClick={() => setSelectedImage(imageUrl)}
                                        >
                                            <img
                                                src={imageUrl}
                                                alt={`Gambar referensi ${index + 1}`}
                                                className="w-full h-48 object-cover"
                                            />
                                        </div>
                                    ))}
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

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="max-w-4xl max-h-full">
                        <img
                            src={selectedImage}
                            alt="Enlarged view"
                            className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                        />
                    </div>
                    <button
                        className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        ×
                    </button>
                </div>
            )}

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