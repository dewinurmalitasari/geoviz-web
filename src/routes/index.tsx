import {createFileRoute, redirect} from '@tanstack/react-router'
import {getAuthentication} from "@/util/auth.ts";
import GeoCard from "@/components/GeoCard.tsx";
import GeoButton from "@/components/GeoButton";
import {ArrowRight, BookOpen, Boxes, Pencil} from 'lucide-react';

export const Route = createFileRoute('/')({
    beforeLoad: () => {
        if (getAuthentication() === null) {
            throw redirect({to: '/login'})
        }
    },
    component: App,
})

function App() {
    const handleExploreMaterials = () => {
        // TODO: Add navigation logic
        console.log('Navigate to materials');
    };

    const handleStartPractice = () => {
        // TODO: Add navigation logic
        console.log('Navigate to practice');
    };

    const handleViewVisualization = () => {
        // TODO: Add navigation logic
        console.log('Navigate to visualization');
    };

    return (
        <div>
            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 md:px-8 py-6 md:py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Materials Card */}
                    <GeoCard
                        icon={<BookOpen className="text-deep-purple-600 text-xl md:text-2xl"/>}
                        title="Materi Pembelajaran"
                        content={
                            <p className="text-gray-600 mb-6 text-sm md:text-base">
                                Jelajahi konsep transformasi geometri dengan penjelasan yang mudah dipahami.
                            </p>
                        }
                        buttons={
                            <GeoButton
                                onClick={handleExploreMaterials}
                                icon={<ArrowRight className="w-4 h-4"/>}
                                text="Jelajahi Materi"
                                variant="primary"
                            />
                        }
                    />

                    {/* Practice Card */}
                    <GeoCard
                        icon={<Pencil className="text-deep-purple-600 text-xl md:text-2xl"/>}
                        title="Latihan Soal"
                        content={
                            <p className="text-gray-600 mb-6 text-sm md:text-base">
                                Uji pemahaman Anda dengan berbagai latihan soal transformasi geometri yang menarik dan
                                interaktif.
                            </p>
                        }
                        buttons={
                            <GeoButton
                                onClick={handleStartPractice}
                                icon={<ArrowRight className="w-4 h-4"/>}
                                text="Mulai Berlatih"
                                variant="primary"
                            />
                        }
                    />

                    {/* Visualization Card */}
                    <GeoCard
                        icon={<Boxes className="text-deep-purple-600 text-xl md:text-2xl"/>}
                        title="Visualisasi 2D & 3D"
                        content={
                            <p className="text-gray-600 mb-6 text-sm md:text-base">
                                Jelajahi transformasi geometri dalam bentuk visual interaktif 2D dan 3D untuk pemahaman
                                yang lebih mendalam.
                            </p>
                        }
                        buttons={
                            <GeoButton
                                onClick={handleViewVisualization}
                                icon={<ArrowRight className="w-4 h-4"/>}
                                text="Lihat Visualisasi"
                                variant="primary"
                            />
                        }
                    />
                </div>

                {/* Progress Section TODO: Deal with this later */}
                <div
                    className="mt-8 md:mt-12 bg-gradient-to-r from-deep-purple-50 to-deep-purple-100 rounded-2xl p-5 md:p-6 shadow-md">
                    <h2 className="text-xl md:text-2xl font-bold text-deep-purple-800 mb-4">Progress Pembelajaran
                        Anda</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex justify-between mb-2">
                                <span className="text-deep-purple-700 font-semibold text-sm md:text-base">Materi Pembelajaran</span>
                                <span className="text-deep-purple-700 font-bold text-sm md:text-base">65%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-gradient-to-r from-deep-purple-400 to-deep-purple-600 h-2.5 rounded-full"
                                    style={{width: '65%'}}
                                ></div>
                            </div>
                            <div className="mt-2 text-xs md:text-sm text-gray-500">
                                <span>12 dari 18 materi selesai</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex justify-between mb-2">
                                <span
                                    className="text-deep-purple-700 font-semibold text-sm md:text-base">Latihan Soal</span>
                                <span className="text-deep-purple-700 font-bold text-sm md:text-base">45%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-gradient-to-r from-deep-purple-400 to-deep-purple-600 h-2.5 rounded-full"
                                    style={{width: '45%'}}
                                ></div>
                            </div>
                            <div className="mt-2 text-xs md:text-sm text-gray-500">
                                <span>27 dari 60 soal terselesaikan</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}