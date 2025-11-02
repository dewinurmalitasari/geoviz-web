// components/user/user-summary.tsx
import {cn} from "@/lib/utils.ts";
import {BarChart3, BookOpen, ChartBar, ChartPie, CheckCircle, Clock, FileText, Target} from "lucide-react";
import type {SummaryStatistics} from "@/type.ts";
import GeoCard from "@/components/geo/geo-card.tsx";

interface UserSummaryProps {
    summary: SummaryStatistics;
    className?: string;
}

export default function UserSummary({summary, className}: UserSummaryProps) {
    const statsCards = [
        {
            title: "Total Kunjungan",
            value: summary.totalVisits,
            icon: <Clock className="w-5 h-5"/>,
            gradient: "from-blue-500 to-cyan-500",
            bgGradient: "from-blue-100 to-cyan-100"
        },
        {
            title: "Akses Materi",
            value: summary.totalMaterialsAccessed,
            icon: <FileText className="w-5 h-5"/>,
            gradient: "from-purple-500 to-pink-500",
            bgGradient: "from-purple-100 to-pink-100"
        },
        {
            title: "Total Materi",
            value: summary.totalMaterialsAvailable,
            icon: <BookOpen className="w-5 h-5"/>,
            gradient: "from-green-500 to-emerald-500",
            bgGradient: "from-green-100 to-emerald-100"
        },
        {
            title: "Latihan Dikerjakan",
            value: `${summary.totalPracticesCompleted}/${summary.totalPracticeAttempts}`,
            icon: <Target className="w-5 h-5"/>,
            gradient: "from-orange-500 to-red-500",
            bgGradient: "from-orange-100 to-red-100"
        },
        {
            title: "Tingkat Penyelesaian",
            value: summary.totalPracticeAttempts > 0
                ? `${Math.min(100, Math.round((summary.totalPracticesCompleted / summary.totalPracticeAttempts) * 100))}%`
                : "0%",
            icon: <CheckCircle className="w-5 h-5"/>,
            gradient: "from-indigo-500 to-blue-500",
            bgGradient: "from-indigo-100 to-blue-100"
        },
        {
            title: "Total Latihan",
            value: summary.totalPracticesAvailable,
            icon: <BarChart3 className="w-5 h-5"/>,
            gradient: "from-teal-500 to-green-500",
            bgGradient: "from-teal-100 to-green-100"
        }
    ];

    // Get material access
    const materialAccess = Object.entries(summary.materialAccessCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, summary.totalMaterialsAvailable);

    // Get practice completion stats
    const practiceStats = Object.entries(summary.practiceCount)
        .map(([practice, stats]) => ({
            name: practice,
            attempted: stats.attempted,
            completed: stats.completed,
            completionRate: stats.attempted > 0
                ? Math.min(100, (stats.completed / stats.attempted) * 100)
                : 0
        }))
        .sort((a, b) => b.completionRate - a.completionRate);

    // Calculate engagement score TODO: Define later per request
    // For now this is a simple weighted calculation
    const calculateEngagement = (summary: SummaryStatistics) => {
        const maxExpected = {
            visits: 24,                                         // ~2x per week for a semester
            materials: summary.totalMaterialsAvailable,         // all materials
            practices: summary.totalMaterialsAvailable * 2,     // ~2 practices per topic
        };

        const visitEngagement = Math.min(100, (summary.totalVisits / maxExpected.visits) * 100);
        const materialEngagement = Math.min(100, (summary.totalMaterialsAccessed / maxExpected.materials) * 100);
        const practiceEngagement = Math.min(100, (summary.totalPracticeAttempts / maxExpected.practices) * 100);

        // Weighted average favoring active participation
        return (visitEngagement * 0.3) + (materialEngagement * 0.3) + (practiceEngagement * 0.4);
    };

    return (
        <div className={cn("space-y-6", className)}>
            {/* Main Statistics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {statsCards.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 overflow-hidden"
                    >
                        <div className={cn("h-1 bg-gradient-to-r", stat.gradient)}></div>
                        <div className="p-4">
                            <div className={cn(
                                "w-12 h-12 rounded-lg bg-gradient-to-r flex items-center justify-center mb-3",
                                stat.bgGradient
                            )}>
                                <div className={cn(
                                    "text-white bg-gradient-to-r rounded-lg w-8 h-8 flex items-center justify-center",
                                    stat.gradient
                                )}>
                                    {stat.icon}
                                </div>
                            </div>
                            <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
                            <p className={cn(
                                "text-2xl font-bold",
                                index === 3 || index === 4 ?
                                    summary.totalPracticesCompleted / summary.totalPracticeAttempts >= 0.7 ?
                                        "text-green-600" :
                                        summary.totalPracticesCompleted / summary.totalPracticeAttempts >= 0.4 ?
                                            "text-yellow-600" :
                                            "text-red-600"
                                    : "text-deep-purple-800"
                            )}>
                                {stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Material Access Section */}
                <GeoCard
                    icon={<ChartBar/>}
                    title="Statistik Akses Materi"
                    content={
                        <div className="space-y-3">
                            {materialAccess.map(([material, count], index) => (
                                <div key={material}
                                     className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded-lg bg-gradient-to-br from-deep-purple-100 to-deep-purple-200 flex items-center justify-center">
                                            <span className="text-sm font-bold text-deep-purple-600">{index + 1}</span>
                                        </div>
                                        <span
                                            className="font-medium text-gray-700 text-sm line-clamp-1">{material}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-500">{count} akses</span>
                                        <div className="w-20 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-deep-purple-400 to-deep-purple-600 h-2 rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${(count / Math.max(...materialAccess.map(([, c]) => c))) * 100}%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                />

                {/* Practice Completion Section */}
                <GeoCard
                    icon={<Target/>}
                    title="Statistik Penyelesaian Latihan"
                    content={
                        <div className="space-y-4">
                            {practiceStats.slice(0, summary.totalPracticesAvailable).map((practice) => (
                                <div key={practice.name} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-gray-700 capitalize">
                                            {practice.name.replace(/_/g, ' ')}
                                        </span>
                                        <span className={cn(
                                            "text-sm font-bold",
                                            practice.completionRate >= 70 ? "text-green-600" :
                                                practice.completionRate >= 40 ? "text-yellow-600" : "text-red-600"
                                        )}>
                                            {practice.completionRate.toFixed(0)}%
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <span>Dikerjakan: {practice.attempted}</span>
                                        <span>Diselesaikan: {practice.completed}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={cn(
                                                "h-2 rounded-full transition-all duration-500",
                                                practice.completionRate >= 70 ? "bg-gradient-to-r from-green-400 to-green-600" :
                                                    practice.completionRate >= 40 ? "bg-gradient-to-r from-yellow-400 to-yellow-600" :
                                                        "bg-gradient-to-r from-red-400 to-red-600"
                                            )}
                                            style={{width: `${practice.completionRate}%`}}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                />
            </div>

            {/* Overall Progress */}
            <GeoCard
                icon={<ChartPie/>}
                title="Progress Keseluruhan"
                content={
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="relative inline-block">
                                <svg className="w-24 h-24" viewBox="0 0 36 36">
                                    <path
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="#E5E7EB"
                                        strokeWidth="3"
                                    />
                                    <path
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="url(#materialGradient)"
                                        strokeWidth="3"
                                        strokeDasharray={`${Math.min(100, Math.round(summary.completionRateMaterials))}, 100`}
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient id="materialGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#8B5CF6"/>
                                            <stop offset="100%" stopColor="#7C3AED"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-bold text-deep-purple-800">
                                        {Math.min(100, Math.round(summary.completionRateMaterials))}%
                                    </span>
                                </div>
                            </div>
                            <p className="mt-2 text-sm font-medium text-gray-600">Progress Materi</p>
                        </div>

                        <div className="text-center">
                            <div className="relative inline-block">
                                <svg className="w-24 h-24" viewBox="0 0 36 36">
                                    <path
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="#E5E7EB"
                                        strokeWidth="3"
                                    />
                                    <path
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="url(#practiceAttemptGradient)"
                                        strokeWidth="3"
                                        strokeDasharray={`${Math.min(100, Math.round((summary.completionRatePractices)))}, 100`}
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient id="practiceAttemptGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#F59E0B"/>
                                            <stop offset="100%" stopColor="#D97706"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-bold text-deep-purple-800">
                                        {Math.min(100, Math.round((summary.completionRatePractices)))}%
                                    </span>
                                </div>
                            </div>
                            <p className="mt-2 text-sm font-medium text-gray-600">Progress Latihan</p>
                        </div>

                        <div className="text-center">
                            <div className="relative inline-block">
                                <svg className="w-24 h-24" viewBox="0 0 36 36">
                                    <path
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="#E5E7EB"
                                        strokeWidth="3"
                                    />
                                    <path
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="url(#practiceGradient)"
                                        strokeWidth="3"
                                        strokeDasharray={`${Math.min(100, Math.round((summary.totalPracticesCompleted / summary.totalPracticeAttempts) * 100))}, 100`}
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient id="practiceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#10B981"/>
                                            <stop offset="100%" stopColor="#059669"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-bold text-deep-purple-800">
                                        {summary.totalPracticeAttempts > 0
                                            ? `${Math.min(100, Math.round((summary.totalPracticesCompleted / summary.totalPracticeAttempts) * 100))}%`
                                            : "0%"
                                        }
                                    </span>
                                </div>
                            </div>
                            <p className="mt-2 text-sm font-medium text-gray-600">Tingkat Penyelesaian</p>
                        </div>

                        <div className="text-center">
                            <div className="relative inline-block">
                                <svg className="w-24 h-24" viewBox="0 0 36 36">
                                    <path
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="#E5E7EB"
                                        strokeWidth="3"
                                    />
                                    <path
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="url(#engagementGradient)"
                                        strokeWidth="3"
                                        strokeDasharray={`${Math.min(100, Math.round(calculateEngagement(summary)))}, 100`}
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient id="engagementGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#3B82F6"/>
                                            <stop offset="100%" stopColor="#1D4ED8"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-bold text-deep-purple-800">
                                        {Math.min(100, Math.round(calculateEngagement(summary)))}%
                                    </span>
                                </div>
                            </div>
                            <p className="mt-2 text-sm font-medium text-gray-600">Tingkat Keterlibatan</p>
                        </div>
                    </div>
                }
            />
        </div>
    );
}