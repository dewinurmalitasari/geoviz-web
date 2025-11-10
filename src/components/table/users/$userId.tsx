import {useMemo} from 'react';
import type {ColumnDef} from '@tanstack/react-table';
import {Annoyed, ArrowUpDown, CircleHelp, Eye, Frown, Smile} from 'lucide-react';
import GeoButton from '@/components/geo/geo-button.tsx';
import {Button} from '@/components/ui/button.tsx';
import {type Practice, type Reaction, ROUTES} from '@/type.ts';
import {cn} from '@/lib/utils.ts';
import he from "he";

export function usePracticeColumns(): ColumnDef<Practice>[] {
    return useMemo(() => [
        {
            id: 'createdAt',
            accessorFn: (row) => {
                const date = new Date(row.createdAt);
                const formatter = new Intl.DateTimeFormat('id-ID', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                });
                return formatter.format(date).replace(',', ' -');
            },
            header: ({column}) => (
                <div className="flex flex-row justify-center items-center">
                    <div className="font-bold">Waktu</div>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer hover:bg-transparent hover:scale-105 transition-all duration-200 p-2 h-8 w-8"
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({getValue}) => (
                <div className="text-center px-4 py-3 font-medium">
                    {getValue<string>()}
                </div>
            ),
            size: 20
        },
        {
            id: 'code',
            accessorKey: 'code',
            header: ({column}) => (
                <div className="flex flex-row justify-center items-center">
                    <div className="font-bold">Kode Latihan</div>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer hover:bg-transparent hover:scale-105 transition-all duration-200 p-2 h-8 w-8"
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({row}) => (
                <div className="text-center px-4 py-3 font-semibold text-deep-purple-700 dark:text-deep-purple-300">
                    {row.original.code.translatePracticeType()}
                </div>
            ),
        },
        {
            id: 'score',
            accessorFn: (row) => {
                const percentage = (row.score.correct / row.score.total) * 100;
                return percentage.toFixed(0);
            },
            header: ({column}) => (
                <div className="flex flex-row justify-center items-center">
                    <div className="font-bold">Nilai</div>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer hover:bg-transparent hover:scale-105 transition-all duration-200 p-2 h-8 w-8"
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({getValue}) => {
                const score = parseInt(getValue<string>());
                let scoreColor;

                if (score >= 80) {
                    scoreColor = "text-green-600 dark:text-green-400 font-bold";
                } else if (score >= 60) {
                    scoreColor = "text-yellow-600 dark:text-yellow-400 font-bold";
                } else {
                    scoreColor = "text-red-600 dark:text-red-400 font-bold";
                }

                return (
                    <div className={cn("text-center px-4 py-3", scoreColor)}>
                        {getValue<string>()}
                    </div>
                );
            },
        },
        {
            id: 'correctTotal',
            accessorFn: (row) => `${row.score.correct}/${row.score.total}`,
            header: ({column}) => (
                <div className="flex flex-row justify-center items-center">
                    <div className="font-bold">Benar/Total</div>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer hover:bg-transparent hover:scale-105 transition-all duration-200 p-2 h-8 w-8"
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({getValue, row}) => {
                const percentage = (row.original.score.correct / row.original.score.total) * 100;
                let bgColor, textColor;

                if (percentage >= 80) {
                    bgColor = "bg-green-50 dark:bg-green-900/20";
                    textColor = "text-green-700 dark:text-green-300";
                } else if (percentage >= 60) {
                    bgColor = "bg-yellow-50 dark:bg-yellow-900/20";
                    textColor = "text-yellow-700 dark:text-yellow-300";
                } else {
                    bgColor = "bg-red-50 dark:bg-red-900/20";
                    textColor = "text-red-700 dark:text-red-300";
                }

                return (
                    <div
                        className={cn(
                            "text-center px-4 py-2 font-semibold rounded-lg mx-2",
                            bgColor,
                            textColor
                        )}>
                        {getValue<string>()}
                    </div>
                );
            },
        },
        {
            id: 'actions',
            header: () => (
                <div className="text-center font-bold">
                    Aksi
                </div>
            ),
            cell: ({row}) => (
                <div className="flex justify-center">
                    <GeoButton
                        to={ROUTES.practices.practiceResult(row.original._id)}
                        variant="primary"
                    >
                        <Eye className="h-4 w-4 mr-1"/> Lihat
                    </GeoButton>
                </div>
            ),
        },
    ], []);
}

export function useStatisticsColumns(): ColumnDef<any>[] {
    return useMemo(() => [
        {
            id: 'createdAt',
            accessorFn: (row) => {
                const date = new Date(row.createdAt);
                const formatter = new Intl.DateTimeFormat('id-ID', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                });
                return formatter.format(date).replace(',', ' -');
            },
            header: ({column}) => (
                <div className="flex flex-row justify-center items-center">
                    <div className="font-bold">Waktu</div>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer hover:bg-transparent hover:scale-105 transition-all duration-200 p-2 h-8 w-8"
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({getValue}) => (
                <div className="text-center px-4 py-3 font-medium">
                    {getValue<string>()}
                </div>
            ),
        },
        {
            id: 'type',
            accessorFn: (row) => row.type.translateType(),
            header: ({column}) => (
                <div className="flex flex-row justify-center items-center">
                    <div className="font-bold">Tipe</div>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer hover:bg-transparent hover:scale-105 transition-all duration-200 p-2 h-8 w-8"
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({row}) => {
                const type: String = row.original.type;
                const typeColor = getTypeColor(row.original.type);
                const typeBgColor = getTypeBgColor(row.original.type);

                return (
                    <div
                        className={cn(
                            "text-center px-4 py-2 font-semibold rounded-full mx-2 border",
                            typeColor,
                            typeBgColor
                        )}>
                        {type.translateType()}
                    </div>
                );
            },
        },
        {
            id: 'details',
            accessorFn: (row) => {
                switch (row.type) {
                    case 'visit':
                        return '-';
                    case 'material':
                        return row.data.title;
                    case 'practice_attempt':
                        return row.data.code.translatePracticeType();
                    case 'practice_completed':
                        return row.data.code.translatePracticeType();
                    default:
                        return '-';
                }
            },
            header: ({column}) => (
                <div className="flex flex-row justify-center items-center">
                    <div className="font-bold">Detail</div>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer hover:bg-transparent hover:scale-105 transition-all duration-200 p-2 h-8 w-8"
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({getValue}) => (
                <div className="text-center px-4 py-3 font-medium text-gray-700 dark:text-gray-200">
                    {getValue<string>()}
                </div>
            ),
        },
    ], []);
}

export function useReactionsColumns(): ColumnDef<Reaction>[] {
    return useMemo(() => [
        {
            id: 'no',
            header: () => (
                <div className="text-center font-bold">
                    No
                </div>
            ),
            cell: ({row}) => (
                <div className="text-center px-4 py-3 font-medium">
                    {row.index + 1}
                </div>
            ),
            size: 10
        },
        {
            id: 'type',
            accessorKey: 'type',
            header: ({column}) => (
                <div className="flex flex-row justify-center items-center">
                    <div className="font-bold">Tipe</div>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer hover:bg-transparent hover:scale-105 transition-all duration-200 p-2 h-8 w-8"
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({row}) => {
                const type: string = row.original.type;
                const typeColor = getReactionTypeColor(type);
                const typeBgColor = getReactionTypeBgColor(type);

                return (
                    <div
                        className={cn(
                            "text-center px-4 py-2 font-semibold rounded-full mx-2 border",
                            typeColor,
                            typeBgColor
                        )}>
                        {type === 'material' ? 'Materi' : 'Latihan'}
                    </div>
                );
            },
        },
        {
            id: 'code_title',
            accessorFn: (row) => {
                if (row.type === 'material' && row.materialTitle) {
                    return he.decode(row.materialTitle);
                } else if (row.type === 'practice' && row.practiceCode) {
                    return row.practiceCode.translatePracticeType();
                }
                return '-';
            },
            header: ({column}) => (
                <div className="flex flex-row justify-center items-center">
                    <div className="font-bold">Kode / Judul</div>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer hover:bg-transparent hover:scale-105 transition-all duration-200 p-2 h-8 w-8"
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({row}) => (
                <div className="text-center px-4 py-3 font-medium text-gray-700 dark:text-gray-200">
                    {row.original.type === 'material' && row.original.materialTitle
                        ? he.decode(row.original.materialTitle)
                        : row.original.type === 'practice' && row.original.practiceCode
                            ? row.original.practiceCode.translatePracticeType()
                            : '-'}
                </div>
            ),
        },
        {
            id: 'reaction',
            accessorKey: 'reaction',
            header: ({column}) => (
                <div className="flex flex-row justify-center items-center">
                    <div className="font-bold">Reaksi</div>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer hover:bg-transparent hover:scale-105 transition-all duration-200 p-2 h-8 w-8"
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({row}) => {
                const reaction = row.original.reaction;
                const reactionData = getReactionData(reaction);

                return (
                    <div className="flex justify-center items-center">
                        <div className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full border",
                            getReactionColor(reaction),
                            getReactionBgColor(reaction)
                        )}>
                            <reactionData.icon className="h-4 w-4" />
                            <span className="font-medium text-sm">
                                {reactionData.label}
                            </span>
                        </div>
                    </div>
                );
            },
        },
        {
            id: 'createdAt',
            accessorFn: (row) => {
                const date = new Date(row.createdAt);
                const formatter = new Intl.DateTimeFormat('id-ID', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                });
                return formatter.format(date).replace(',', ' -');
            },
            header: ({column}) => (
                <div className="flex flex-row justify-center items-center">
                    <div className="font-bold">Waktu</div>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer hover:bg-transparent hover:scale-105 transition-all duration-200 p-2 h-8 w-8"
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({getValue}) => (
                <div className="text-center px-4 py-3 font-medium">
                    {getValue<string>()}
                </div>
            ),
        },
    ], []);
}

// Helper functions for reactions
function getReactionData(reaction: string) {
    switch (reaction) {
        case 'happy':
            return {
                icon: Smile,
                label: 'Senang'
            };
        case 'neutral':
            return {
                icon: Annoyed,
                label: 'Biasa'
            };
        case 'sad':
            return {
                icon: Frown,
                label: 'Sedih'
            };
        case 'confused':
            return {
                icon: CircleHelp,
                label: 'Bingung'
            };
        default:
            return {
                icon: CircleHelp,
                label: 'Tidak Diketahui'
            };
    }
}

function getReactionColor(reaction: string): string {
    switch (reaction) {
        case 'happy':
            return 'text-green-700 dark:text-green-300 border-green-200 dark:border-green-700';
        case 'neutral':
            return 'text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700';
        case 'sad':
            return 'text-red-700 dark:text-red-300 border-red-200 dark:border-red-700';
        case 'confused':
            return 'text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700';
        default:
            return 'text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
}

function getReactionBgColor(reaction: string): string {
    switch (reaction) {
        case 'happy':
            return 'bg-green-50 dark:bg-green-900/20';
        case 'neutral':
            return 'bg-yellow-50 dark:bg-yellow-900/20';
        case 'sad':
            return 'bg-red-50 dark:bg-red-900/20';
        case 'confused':
            return 'bg-purple-50 dark:bg-purple-900/20';
        default:
            return 'bg-gray-50 dark:bg-gray-900/20';
    }
}

function getReactionTypeColor(type: string): string {
    switch (type) {
        case 'material':
            return 'text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700';
        case 'practice':
            return 'text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700';
        default:
            return 'text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
}

function getReactionTypeBgColor(type: string): string {
    switch (type) {
        case 'material':
            return 'bg-blue-50 dark:bg-blue-900/20';
        case 'practice':
            return 'bg-orange-50 dark:bg-orange-900/20';
        default:
            return 'bg-gray-50 dark:bg-gray-900/20';
    }
}

function getTypeColor(type: string): string {
    switch (type) {
        case 'visit':
            return 'text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700';
        case 'material':
            return 'text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700';
        case 'practice_attempt':
            return 'text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700';
        case 'practice_completed':
            return 'text-green-700 dark:text-green-300 border-green-200 dark:border-green-700';
        default:
            return 'text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
}

function getTypeBgColor(type: string): string {
    switch (type) {
        case 'visit':
            return 'bg-blue-50 dark:bg-blue-900/20';
        case 'material':
            return 'bg-purple-50 dark:bg-purple-900/20';
        case 'practice_attempt':
            return 'bg-yellow-50 dark:bg-yellow-900/20';
        case 'practice_completed':
            return 'bg-green-50 dark:bg-green-900/20';
        default:
            return 'bg-gray-50 dark:bg-gray-900/20';
    }
}