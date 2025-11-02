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
                        className="cursor-pointer hover:bg-transparent hover:scale-103"
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({getValue}) => <div className="text-center">{getValue<string>()}</div>,
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
                        className="cursor-pointer hover:bg-transparent hover:scale-103"
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({row}) => <div className="text-center">{row.original.code}</div>,
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
                        className="cursor-pointer hover:bg-transparent hover:scale-103"
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({getValue}) => <div className="text-center">{getValue<string>()}</div>,
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
                        className="cursor-pointer hover:bg-transparent hover:scale-103"
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({getValue}) => <div className="text-center">{getValue<string>()}</div>,
        },
        {
            id: 'actions',
            header: () => <div className="text-end font-bold pe-10">Aksi</div>,
            cell: ({row}) => (
                <div className="flex justify-end pe-4">
                    <GeoButton
                        to={ROUTES.practices.practiceResult(row.original._id)}
                        variant="primary"
                        className="h-[40px] w-[80px]"
                    >
                        <Eye/> Lihat
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
                        className="cursor-pointer hover:bg-transparent hover:scale-103"
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({getValue}) => <div className="text-center">{getValue<string>()}</div>,
        },
        {
            id: 'type',
            accessorKey: 'type',
            header: ({column}) => (
                <div className="ml-10 flex flex-row justify-center items-center">
                    <div className="font-bold">Tipe</div>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="cursor-pointer hover:bg-transparent hover:scale-103"
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({row}) => {
                const type: String = row.original.type;
                return <div className="text-center">{type.translateType()}</div>;
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
                        className="cursor-pointer hover:bg-transparent hover:scale-103"
                    >
                        <ArrowUpDown className="h-4 w-4"/>
                    </Button>
                </div>
            ),
            cell: ({getValue}) => <div className="text-center">{getValue<string>()}</div>,
        },
    ], []);
}
