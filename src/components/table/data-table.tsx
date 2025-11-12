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
import {TablePagination} from "@/components/table/table-pagination.tsx";
import {useIsMobile} from "@/hooks/use-mobile.ts"
import {Input} from "@/components/ui/input.tsx"
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import {cn} from "@/lib/utils";
import {colorMap, type ColorScheme, DEFAULT_COLOR_SCHEME} from "@/lib/color-scheme";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    isLoading?: boolean
    colorScheme?: ColorScheme
}

export function DataTable<TData, TValue>(
    {
        columns,
        data,
        isLoading = false,
        colorScheme = DEFAULT_COLOR_SCHEME
    }: DataTableProps<TData, TValue>) {
    const isMobile = useIsMobile()
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = React.useState("")
    const colors = colorMap[colorScheme];

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

    const getTableGradient = (color: ColorScheme) => {
        switch (color) {
            case 'blue':
                return 'from-blue-50 to-blue-100';
            case 'orange':
                return 'from-orange-50 to-orange-100';
            case 'teal':
                return 'from-teal-50 to-teal-100';
            case 'yellow':
                return 'from-yellow-50 to-yellow-100';
            case 'maroon':
                return 'from-rose-50 to-rose-100';
            default:
                return 'from-deep-purple-50 to-deep-purple-100';
        }
    };

    const getSkeletonColor = (color: ColorScheme) => {
        switch (color) {
            case 'blue':
                return 'bg-blue-200 dark:bg-blue-600';
            case 'orange':
                return 'bg-orange-200 dark:bg-orange-600';
            case 'teal':
                return 'bg-teal-200 dark:bg-teal-600';
            case 'yellow':
                return 'bg-yellow-200 dark:bg-yellow-600';
            case 'maroon':
                return 'bg-rose-200 dark:bg-rose-600';
            default:
                return 'bg-deep-purple-200 dark:bg-deep-purple-600';
        }
    };

    return (
        <div className={cn(
            "overflow-hidden rounded-xl border shadow-sm",
            colors.border,
            "dark:border-deep-purple-600"
        )}>
            <div className={cn(
                "flex items-center justify-between py-4 px-4 bg-gradient-to-r border-b",
                getTableGradient(colorScheme),
                colors.border,
                "dark:border-deep-purple-500",
            )}>
                <Input
                    placeholder="Cari semua..."
                    value={globalFilter ?? ""}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className={cn(
                        "max-w-sm flex-1 bg-white dark:bg-deep-purple-800 text-gray-700 dark:text-gray-200",
                        colors.focus,
                        colors.border
                    )}
                />
                <div className={cn(
                    "text-sm font-medium flex-1 ml-2 text-right",
                    colors.text,
                    "dark:text-deep-purple-200"
                )}>
                    {table.getFilteredRowModel().rows.length} dari {data.length} entri
                </div>
            </div>

            <ScrollArea className="w-full">
                <Table className={isMobile ? "text-sm" : ""}>
                    <TableHeader className={cn(
                        "bg-gradient-to-r",
                        getTableGradient(colorScheme),
                    )}>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className={cn(
                                    "border-b hover:bg-transparent",
                                    colors.border,
                                    "dark:border-deep-purple-500"
                                )}
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={cn(
                                                "font-bold",
                                                colors.title,
                                                "dark:text-geo-purple-50"
                                            )}
                                        >
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
                                    className={cn(
                                        "border-b hover:bg-transparent",
                                        colors.border,
                                        "dark:border-deep-purple-600"
                                    )}
                                >
                                    {columns.map((_, colIndex) => (
                                        <TableCell
                                            key={`skeleton-cell-${colIndex}`}
                                            className="text-gray-700 dark:text-gray-200"
                                        >
                                            <Skeleton className={cn(
                                                "h-6",
                                                getSkeletonColor(colorScheme)
                                            )}/>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={cn(
                                        "border-b transition-all duration-200 hover:shadow-[inset_4px_0_0_0]",
                                        colors.border,
                                        "dark:border-deep-purple-600",
                                        `hover:${colors.cardSelected.split(' ')[2]}`,
                                        `dark:hover:bg-deep-purple-700/80`,
                                        colors.checked.replace('data-[state=checked]:', 'hover:shadow-')
                                    )}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="text-gray-700 dark:text-gray-200"
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className="hover:bg-transparent">
                                <TableCell
                                    colSpan={columns.length}
                                    className={cn(
                                        "h-24 text-center font-semibold",
                                        colors.text,
                                        "dark:text-deep-purple-300"
                                    )}
                                >
                                    Tidak ada data.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal"/>
            </ScrollArea>

            <TablePagination table={table} colorScheme={colorScheme}/>
        </div>
    )
}