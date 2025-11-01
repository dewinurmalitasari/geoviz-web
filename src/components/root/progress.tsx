

export default function Progress() {
    return (
        <div
            className="mt-8 md:mt-12 bg-gradient-to-r from-deep-purple-50 to-deep-purple-100 rounded-2xl p-5 md:p-6 shadow-md">
            <h2 className="text-xl md:text-2xl font-bold text-deep-purple-800 mb-4">Progress Pembelajaran
                Anda</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between mb-2">
                        <span
                            className="text-deep-purple-700 font-semibold text-sm md:text-base">Materi Pembelajaran</span>
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
    );
}