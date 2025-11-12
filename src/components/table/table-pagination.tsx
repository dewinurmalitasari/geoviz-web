import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination.tsx"
import { useIsMobile } from "@/hooks/use-mobile.ts"
import { cn } from "@/lib/utils"
import { colorMap, DEFAULT_COLOR_SCHEME, type ColorScheme } from "@/lib/color-scheme"

interface TablePaginationProps {
    table: any
    colorScheme?: ColorScheme
}

export function TablePagination({ table, colorScheme = DEFAULT_COLOR_SCHEME }: TablePaginationProps) {
    const isMobile = useIsMobile()
    const currentPage = table.getState().pagination.pageIndex + 1
    const pageCount = table.getPageCount()
    const canPreviousPage = table.getCanPreviousPage()
    const canNextPage = table.getCanNextPage()
    const colors = colorMap[colorScheme]

    // Generate page numbers to display - simplified for mobile
    const getPageNumbers = () => {
        if (isMobile) {
            // Mobile: Show only current page and ellipsis if needed
            if (pageCount <= 3) {
                return Array.from({ length: pageCount }, (_, i) => i + 1)
            }

            const pages = []
            if (currentPage > 2) {
                pages.push(1)
                if (currentPage > 3) {
                    pages.push('ellipsis-start')
                }
            }

            pages.push(currentPage)

            if (currentPage < pageCount - 1) {
                if (currentPage < pageCount - 2) {
                    pages.push('ellipsis-end')
                }
                pages.push(pageCount)
            }

            return pages
        }

        // Desktop: Show more pages
        const pages = []
        const maxVisiblePages = 5

        if (pageCount <= maxVisiblePages) {
            for (let i = 0; i < pageCount; i++) {
                pages.push(i + 1)
            }
        } else {
            const startPage = Math.max(1, currentPage - 1)
            const endPage = Math.min(pageCount, startPage + maxVisiblePages - 1)

            if (startPage > 1) {
                pages.push(1)
                if (startPage > 2) {
                    pages.push('ellipsis-start')
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i)
            }

            if (endPage < pageCount) {
                if (endPage < pageCount - 1) {
                    pages.push('ellipsis-end')
                }
                pages.push(pageCount)
            }
        }

        return pages
    }

    const getPaginationTextColor = (color: ColorScheme) => {
        switch (color) {
            case 'blue': return 'text-blue-600 dark:text-blue-300';
            case 'orange': return 'text-orange-600 dark:text-orange-300';
            case 'teal': return 'text-teal-600 dark:text-teal-300';
            case 'yellow': return 'text-yellow-600 dark:text-yellow-300';
            case 'maroon': return 'text-rose-600 dark:text-rose-300';
            default: return 'text-deep-purple-600 dark:text-deep-purple-300';
        }
    };

    const getPaginationHoverColor = (color: ColorScheme) => {
        switch (color) {
            case 'blue': return 'hover:bg-blue-50 dark:hover:bg-blue-700 hover:text-blue-700 dark:hover:text-blue-200';
            case 'orange': return 'hover:bg-orange-50 dark:hover:bg-orange-700 hover:text-orange-700 dark:hover:text-orange-200';
            case 'teal': return 'hover:bg-teal-50 dark:hover:bg-teal-700 hover:text-teal-700 dark:hover:text-teal-200';
            case 'yellow': return 'hover:bg-yellow-50 dark:hover:bg-yellow-700 hover:text-yellow-700 dark:hover:text-yellow-200';
            case 'maroon': return 'hover:bg-rose-50 dark:hover:bg-rose-700 hover:text-rose-700 dark:hover:text-rose-200';
            default: return 'hover:bg-deep-purple-50 dark:hover:bg-deep-purple-700 hover:text-deep-purple-700 dark:hover:text-deep-purple-200';
        }
    };

    const getPaginationBorderColor = (color: ColorScheme) => {
        switch (color) {
            case 'blue': return 'border-blue-200 dark:border-blue-600';
            case 'orange': return 'border-orange-200 dark:border-orange-600';
            case 'teal': return 'border-teal-200 dark:border-teal-600';
            case 'yellow': return 'border-yellow-200 dark:border-yellow-600';
            case 'maroon': return 'border-rose-200 dark:border-rose-600';
            default: return 'border-deep-purple-200 dark:border-deep-purple-600';
        }
    };

    const getActivePaginationColor = (color: ColorScheme) => {
        switch (color) {
            case 'blue': return 'bg-blue-600 border-blue-600 text-white';
            case 'orange': return 'bg-orange-600 border-orange-600 text-white';
            case 'teal': return 'bg-teal-600 border-teal-600 text-white';
            case 'yellow': return 'bg-yellow-600 border-yellow-600 text-white';
            case 'maroon': return 'bg-rose-600 border-rose-600 text-white';
            default: return 'bg-deep-purple-600 border-deep-purple-600 text-white';
        }
    };

    const pageNumbers = getPageNumbers()

    return (
        <Pagination className={cn(
            "py-3 border-t bg-white dark:bg-deep-purple-800 flex flex-col items-center",
            colors.border,
            "dark:border-deep-purple-600"
        )}>
            <PaginationContent className="flex-wrap gap-2">
                {/* Previous Page Button */}
                <PaginationItem className="flex items-center gap-1">
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            table.previousPage()
                        }}
                        className={cn(
                            "transition-colors duration-200 [&>span]:hidden",
                            getPaginationBorderColor(colorScheme),
                            getPaginationHoverColor(colorScheme),
                            !canPreviousPage ? "pointer-events-none opacity-50" : "cursor-pointer"
                        )}
                        size="sm"
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {pageNumbers.map((page, index) => {
                    if (page === 'ellipsis-start' || page === 'ellipsis-end') {
                        return (
                            <PaginationItem key={`ellipsis-${index}`}>
                                <PaginationEllipsis className={getPaginationTextColor(colorScheme)} />
                            </PaginationItem>
                        )
                    }

                    const isActive = currentPage === page

                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    if (!isActive) {
                                        e.preventDefault()
                                        table.setPageIndex(Number(page) - 1)
                                    }
                                }}
                                isActive={isActive}
                                className={cn(
                                    "border transition-colors duration-200",
                                    getPaginationBorderColor(colorScheme),
                                    isActive
                                        ? cn(
                                            "cursor-default pointer-events-none",
                                            getActivePaginationColor(colorScheme)
                                        )
                                        : cn(
                                            "cursor-pointer",
                                            getPaginationHoverColor(colorScheme)
                                        ),
                                    isMobile ? "text-sm px-3 py-1" : ""
                                )}
                                size="sm"
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })}

                {/* Next Page Button */}
                <PaginationItem className="flex items-center gap-1">
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            table.nextPage()
                        }}
                        className={cn(
                            "transition-colors duration-200 [&>span]:hidden",
                            getPaginationBorderColor(colorScheme),
                            getPaginationHoverColor(colorScheme),
                            !canNextPage ? "pointer-events-none opacity-50" : "cursor-pointer"
                        )}
                        size="sm"
                    />
                </PaginationItem>
            </PaginationContent>

            {/* Page Info - Show on mobile for better UX */}
            {isMobile && (
                <div className="text-center mt-2">
                    <span className={cn(
                        "text-sm font-medium",
                        getPaginationTextColor(colorScheme)
                    )}>
                        Halaman {currentPage} dari {pageCount}
                    </span>
                </div>
            )}

            {/* Page Info for Desktop */}
            {!isMobile && (
                <div className="text-center mt-2">
                    <span className={cn(
                        "text-sm font-medium",
                        getPaginationTextColor(colorScheme)
                    )}>
                        Halaman {currentPage} dari {pageCount}
                    </span>
                </div>
            )}
        </Pagination>
    )
}