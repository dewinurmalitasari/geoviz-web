import {useMemo} from 'react';
import type {ColumnDef} from '@tanstack/react-table';
import {ArrowUpDown, Eye} from 'lucide-react';
import GeoButton from '@/components/geo/geo-button.tsx';
import {Button} from '@/components/ui/button.tsx';
import {type Practice, ROUTES} from '@/type.ts';
import {cn} from '@/lib/utils.ts';

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
                    {row.original.code}
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
                <div className="text-end font-bold pe-6 text-deep-purple-800 dark:text-geo-purple-50">
                    Aksi
                </div>
            ),
            cell: ({row}) => (
                <div className="flex justify-end pe-4">
                    <GeoButton
                        to={ROUTES.practices.practiceResult(row.original._id)}
                        variant="primary"
                        className="h-10 w-24 bg-gradient-to-r from-geo-purple-500 to-deep-purple-500 hover:from-geo-purple-600 hover:to-deep-purple-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
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
                        return row.data.code;
                    case 'practice_completed':
                        return row.data.code;
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

// Enhanced helper functions for type styling
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