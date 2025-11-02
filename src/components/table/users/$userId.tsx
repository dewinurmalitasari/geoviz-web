import {useMemo} from 'react';
import type {ColumnDef} from '@tanstack/react-table';
import {ArrowUpDown, Eye} from 'lucide-react';
import GeoButton from '@/components/geo/geo-button.tsx';
import {Button} from '@/components/ui/button.tsx';
import {type Practice, ROUTES} from '@/type.ts';

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
                <div className="ml-10 flex flex-row justify-center items-center">
                    <div className="font-bold">Waktu</div>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer hover:bg-transparent hover:scale-103 "
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({getValue}) => (
                <div
                    className="text-center px-4 py-3">
                    {getValue<string>()}
                </div>
            ),
        },
        {
            id: 'code',
            accessorKey: 'code',
            header: ({column}) => (
                <div className="ml-10 flex flex-row justify-center items-center">
                    <div className="font-bold">Kode Latihan</div>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer hover:bg-transparent hover:scale-103 "
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({row}) => (
                <div
                    className="text-center px-4 py-3  font-semibold ">
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
                <div className="ml-10 flex flex-row justify-center items-center">
                    <div className="font-bold">Nilai</div>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer hover:bg-transparent hover:scale-103 "
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({getValue}) => {
                const score = parseInt(getValue<string>());
                let scoreColor;

                if (score >= 80) {
                    scoreColor = "text-green-600 dark:text-green-400";
                } else if (score >= 60) {
                    scoreColor = "text-yellow-600 dark:text-yellow-400";
                } else {
                    scoreColor = "text-red-600 dark:text-red-400";
                }

                return (
                    <div className={`text-center px-4 py-3 font-bold ${scoreColor} `}>
                        {getValue<string>()}
                    </div>
                );
            },
        },
        {
            id: 'correctTotal',
            accessorFn: (row) => `${row.score.correct}/${row.score.total}`,
            header: ({column}) => (
                <div className="ml-10 flex flex-row justify-center items-center">
                    <div className="font-bold">Benar/Total</div>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer hover:bg-transparent hover:scale-103 "
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({getValue, row}) => {
                const percentage = (row.original.score.correct / row.original.score.total) * 100;
                let bgColor;

                if (percentage >= 80) {
                    bgColor = "bg-green-50 dark:bg-green-900/20";
                } else if (percentage >= 60) {
                    bgColor = "bg-yellow-50 dark:bg-yellow-900/20";
                } else {
                    bgColor = "bg-red-50 dark:bg-red-900/20";
                }

                return (
                    <div
                        className={`text-center px-4 py-3 font-medium text-gray-700 dark:text-gray-200 ${bgColor} rounded-lg mx-2`}>
                        {getValue<string>()}
                    </div>
                );
            },
        },
        {
            id: 'actions',
            header: () => <div
                className="text-end font-bold pe-10 text-deep-purple-800 dark:text-geo-purple-50">Aksi</div>,
            cell: ({row}) => (
                <div className="flex justify-end pe-4">
                    <GeoButton
                        to={ROUTES.practices.practiceResult(row.original._id)}
                        variant="primary"
                        className="h-[40px] w-[80px] bg-gradient-to-r from-geo-purple-500 to-deep-purple-500 hover:from-geo-purple-600 hover:to-deep-purple-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
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
                <div className="ml-10 flex flex-row justify-center items-center">
                    <div className="font-bold">Waktu</div>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer hover:bg-transparent hover:scale-103 "
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({getValue}) => (
                <div
                    className="text-center px-4 py-3">
                    {getValue<string>()}
                </div>
            ),
        },
        {
            id: 'type',
            accessorFn: (row) => row.type.translateType(),
            header: ({column}) => (
                <div className="ml-10 flex flex-row justify-center items-center">
                    <div className="font-bold">Tipe</div>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer hover:bg-transparent hover:scale-103 "
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({row}) => {
                const type: String = row.original.type;
                const typeColor = getTypeColor(row.original.type);
                return (
                    <div
                        className={`text-center px-4 py-2 font-semibold ${typeColor}  rounded-full mx-2`}>
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
                <div className="ml-10 flex flex-row justify-center items-center">
                    <div className="font-bold">Detail</div>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer hover:bg-transparent hover:scale-103 "
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({getValue}) => (
                <div
                    className="text-center px-4 py-3">
                    {getValue<string>()}
                </div>
            ),
        },
    ], []);
}

// Helper function for type colors
function getTypeColor(type: string): string {
    switch (type) {
        case 'visit':
            return 'text-blue-600 dark:text-blue-400';
        case 'material':
            return 'text-purple-600 dark:text-purple-400 ';
        case 'practice_attempt':
            return 'text-yellow-600 dark:text-yellow-400';
        case 'practice_completed':
            return 'text-green-600 dark:text-green-400';
        default:
            return 'text-gray-600 dark:text-gray-400';
    }
}