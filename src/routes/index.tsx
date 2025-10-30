import {createFileRoute, redirect} from '@tanstack/react-router'
import {getAuthentication} from "@/util/auth.ts";

export const Route = createFileRoute('/')({
    beforeLoad: () => {
        if (getAuthentication() === null) {
            throw redirect({to: '/login'})
        }
    },
    component: App,
})

function App() {
    return (
        <div>
            {/*TODO: Fix this and compartmentalize*/}

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 md:px-8 py-6 md:py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Materials Card */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100">
                        <div className="h-2 bg-gradient-to-r from-deep-purple-400 to-deep-purple-600"></div>
                        <div className="p-5 md:p-6">
                            <div className="flex items-center mb-4">
                                <div
                                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-deep-purple-100 to-deep-purple-200 flex items-center justify-center mr-3 md:mr-4">
                                    <i className="fas fa-book-open text-deep-purple-600 text-xl md:text-2xl"></i>
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold text-deep-purple-800">Materi
                                    Pembelajaran</h2>
                            </div>
                            <p className="text-gray-600 mb-6 text-sm md:text-base">
                                Jelajahi konsep transformasi geometri seperti translasi, rotasi, refleksi, dan dilatasi
                                dengan penjelasan yang mudah dipahami.
                            </p>
                            <a href="#"
                               className="inline-flex items-center px-4 py-2 md:px-5 md:py-3 rounded-xl bg-gradient-to-r from-deep-purple-500 to-deep-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-sm md:text-base">
                                <span>Jelajahi Materi</span>
                                <i className="fas fa-arrow-right ml-2"></i>
                            </a>
                        </div>
                    </div>

                    {/* Practice Card */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100">
                        <div className="h-2 bg-gradient-to-r from-deep-purple-300 to-deep-purple-500"></div>
                        <div className="p-5 md:p-6">
                            <div className="flex items-center mb-4">
                                <div
                                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-deep-purple-100 to-deep-purple-200 flex items-center justify-center mr-3 md:mr-4">
                                    <i className="fas fa-pencil-alt text-deep-purple-600 text-xl md:text-2xl"></i>
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold text-deep-purple-800">Latihan Soal</h2>
                            </div>
                            <p className="text-gray-600 mb-6 text-sm md:text-base">
                                Uji pemahaman Anda dengan berbagai latihan soal transformasi geometri yang menarik dan
                                interaktif.
                            </p>
                            <a href="#"
                               className="inline-flex items-center px-4 py-2 md:px-5 md:py-3 rounded-xl bg-gradient-to-r from-deep-purple-500 to-deep-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-sm md:text-base">
                                <span>Mulai Berlatih</span>
                                <i className="fas fa-arrow-right ml-2"></i>
                            </a>
                        </div>
                    </div>

                    {/* Visualization Card */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100">
                        <div className="h-2 bg-gradient-to-r from-deep-purple-200 to-deep-purple-400"></div>
                        <div className="p-5 md:p-6">
                            <div className="flex items-center mb-4">
                                <div
                                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-deep-purple-100 to-deep-purple-200 flex items-center justify-center mr-3 md:mr-4">
                                    <i className="fas fa-cube text-deep-purple-600 text-xl md:text-2xl"></i>
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold text-deep-purple-800">Visualisasi 2D &
                                    3D</h2>
                            </div>
                            <p className="text-gray-600 mb-6 text-sm md:text-base">
                                Jelajahi transformasi geometri dalam bentuk visual interaktif 2D dan 3D untuk pemahaman
                                yang lebih mendalam.
                            </p>
                            <a href="#"
                               className="inline-flex items-center px-4 py-2 md:px-5 md:py-3 rounded-xl bg-gradient-to-r from-deep-purple-500 to-deep-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-sm md:text-base">
                                <span>Lihat Visualisasi</span>
                                <i className="fas fa-arrow-right ml-2"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Progress Section */}
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
