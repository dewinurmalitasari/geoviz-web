import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx"
import {Skeleton} from "@/components/ui/skeleton.tsx";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    isLoading?: boolean
}

export function DataTable<TData, TValue>({columns, data, isLoading = false,}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    // TODO: pagination, sorting, filtering, etc.
    return (
        <div className="overflow-hidden rounded-xl border border-deep-purple-200 dark:border-deep-purple-600 shadow-sm">
            <Table>
                <TableHeader
                    className="bg-gradient-to-r from-deep-purple-50 to-geo-purple-100 dark:from-deep-purple-700 dark:to-deep-purple-600">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}
                                  className="border-b border-deep-purple-200 dark:border-deep-purple-500 hover:bg-transparent">
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}
                                               className="text-deep-purple-800 dark:text-geo-purple-50 font-bold">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className="bg-white dark:bg-deep-purple-800">
                    {isLoading ? (
                        Array.from({length: 10}).map((_, rowIndex) => (
                            <TableRow
                                key={`skeleton-${rowIndex}`}
                                className="border-b border-geo-purple-100 dark:border-deep-purple-600 hover:bg-transparent"
                            >
                                {columns.map((_, colIndex) => (
                                    <TableCell key={`skeleton-cell-${colIndex}`}
                                               className="text-gray-700 dark:text-gray-200">
                                        <Skeleton className="h-8 w-full bg-geo-purple-200"/>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="border-b border-geo-purple-100 dark:border-deep-purple-600 hover:bg-geo-purple-50 dark:hover:bg-deep-purple-700 transition-colors"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="text-gray-700 dark:text-gray-200">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow className="hover:bg-transparent">
                            <TableCell colSpan={columns.length}
                                       className="h-24 text-center text-deep-purple-600 dark:text-deep-purple-300 font-semibold">
                                Tidak ada data.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody> </Table>
        </div>
    )
}
