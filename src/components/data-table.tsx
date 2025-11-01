import * as React from "react";
import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
} from "@tanstack/react-table";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table.tsx"
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {TablePagination} from "@/components/table-pagination.tsx";
import {useIsMobile} from "@/hooks/use-mobile"
import {Input} from "@/components/ui/input"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    isLoading?: boolean
}

export function DataTable<TData, TValue>({columns, data, isLoading = false,}: DataTableProps<TData, TValue>) {
    const isMobile = useIsMobile()
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [globalFilter, setGlobalFilter] = React.useState("")

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10
            },
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            columnFilters,
            globalFilter,
        },
    })


    return (
        <div className="overflow-hidden rounded-xl border border-deep-purple-200 dark:border-deep-purple-600 shadow-sm">
            <div
                className="flex items-center py-4 px-4 bg-gradient-to-r from-deep-purple-50 to-geo-purple-100 dark:from-deep-purple-700 dark:to-deep-purple-600 border-b border-deep-purple-200 dark:border-deep-purple-500">
                <Input
                    placeholder="Cari semua..."
                    value={globalFilter ?? ""}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="max-w-sm border-deep-purple-200 dark:border-deep-purple-500 bg-white dark:bg-deep-purple-800 text-gray-700 dark:text-gray-200 focus-visible:ring-deep-purple-500 dark:focus-visible:ring-deep-purple-400"
                />
            </div>

            <Table className={isMobile ? "text-sm" : ""}>
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
                        Array.from({length: isMobile ? 3 : 10}).map((_, rowIndex) => (
                            <TableRow
                                key={`skeleton-${rowIndex}`}
                                className="border-b border-geo-purple-100 dark:border-deep-purple-600 hover:bg-transparent"
                            >
                                {columns.map((_, colIndex) => (
                                    <TableCell key={`skeleton-cell-${colIndex}`}
                                               className="text-gray-700 dark:text-gray-200">
                                        <Skeleton className="h-6 bg-geo-purple-200 dark:bg-deep-purple-600"/>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="border-b border-geo-purple-100 dark:border-deep-purple-600 hover:bg-deep-purple-50 dark:hover:bg-deep-purple-700/80 transition-colors duration-200"
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
                </TableBody>
            </Table>

            <TablePagination table={table}/>
        </div>
    )
}