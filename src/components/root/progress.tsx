import GeoButton from "@/components/geo/geo-button.tsx";
import {ROUTES, type StatisticsProgress} from "@/type.ts";

interface ProgressProps {
    progress: StatisticsProgress;
    _id: string;
}

export default function Progress({progress, _id}: ProgressProps) {
    return (
        <div
            data-aos="zoom-in-up"
            className="mt-8 md:mt-12 bg-gradient-to-r from-deep-purple-50 to-deep-purple-100 rounded-2xl p-5 md:p-6 shadow-md border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-deep-purple-800 md:text-start text-center w-full">
                    Progress Pembelajaran Anda
                </h2>
                <GeoButton
                    to={ROUTES.users.userDetail(_id)}
                    variant="outline"
                    className="w-full sm:w-auto text-sm px-4 py-2 whitespace-nowrap"
                >
                    Lihat Histori
                </GeoButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <div className="flex justify-between mb-2">
                        <span className="text-deep-purple-700 font-semibold text-sm md:text-base">
                            Materi Pembelajaran
                        </span>
                        <span className="text-deep-purple-700 font-bold text-sm md:text-base">
                              {Math.round(progress.completionRateMaterials)}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-gradient-to-r from-deep-purple-400 to-deep-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                            style={{width: progress.completionRateMaterials + '%'}}
                        ></div>
                    </div>
                    <div className="mt-2 text-xs md:text-sm text-gray-500">
                        {progress.totalMaterialsAccessed} dari {progress.totalMaterialsAvailable} materi selesai
                    </div>
                </div>

                <div
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <div className="flex justify-between mb-2">
                        <span className="text-deep-purple-700 font-semibold text-sm md:text-base">
                            Latihan Soal
                        </span>
                        <span className="text-deep-purple-700 font-bold text-sm md:text-base">
                            {Math.round(progress.completionRatePractices)}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-gradient-to-r from-deep-purple-400 to-deep-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                            style={{width: progress.completionRatePractices + '%'}}
                        ></div>
                    </div>
                    <div className="mt-2 text-xs md:text-sm text-gray-500">
                        {progress.totalPracticesCompleted} dari {progress.totalPracticesAvailable} latihan selesai
                    </div>
                </div>
            </div>
        </div>
    );
}