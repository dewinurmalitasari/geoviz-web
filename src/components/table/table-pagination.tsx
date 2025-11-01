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

interface TablePaginationProps {
    table: any
}

export function TablePagination({ table }: TablePaginationProps) {
    const isMobile = useIsMobile()
    const currentPage = table.getState().pagination.pageIndex + 1
    const pageCount = table.getPageCount()
    const canPreviousPage = table.getCanPreviousPage()
    const canNextPage = table.getCanNextPage()

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

    const pageNumbers = getPageNumbers()

    return (
        <Pagination className="py-3 border-t border-deep-purple-200 dark:border-deep-purple-600 bg-white dark:bg-deep-purple-800 flex flex-col items-center">
            <PaginationContent className="flex-wrap gap-2">
                {/* Previous Page Button */}
                <PaginationItem className="flex items-center gap-1">
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            table.previousPage()
                        }}
                        className={`
                            ${!canPreviousPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            border border-deep-purple-200 dark:border-deep-purple-600
                            hover:bg-deep-purple-50 dark:hover:bg-deep-purple-700
                            hover:text-deep-purple-700 dark:hover:text-deep-purple-200
                            transition-colors duration-200 [&>span]:hidden
                        `}
                        size="sm"
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {pageNumbers.map((page, index) => {
                    if (page === 'ellipsis-start' || page === 'ellipsis-end') {
                        return (
                            <PaginationItem key={`ellipsis-${index}`}>
                                <PaginationEllipsis className="text-deep-purple-400 dark:text-deep-purple-400" />
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
                                className={`
                                    border transition-colors duration-200
                                    ${isActive
                                    ? "bg-deep-purple-600 border-deep-purple-600 text-white cursor-default pointer-events-none"
                                    : "border-deep-purple-200 dark:border-deep-purple-600 cursor-pointer hover:bg-deep-purple-50 dark:hover:bg-deep-purple-700 hover:text-deep-purple-700 dark:hover:text-deep-purple-200"
                                }
                                    ${isMobile ? "text-sm px-3 py-1" : ""}
                                `}
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
                        className={`
                            ${!canNextPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            border border-deep-purple-200 dark:border-deep-purple-600
                            hover:bg-deep-purple-50 dark:hover:bg-deep-purple-700
                            hover:text-deep-purple-700 dark:hover:text-deep-purple-200
                            transition-colors duration-200 [&>span]:hidden
                        `}
                        size="sm"
                    />
                </PaginationItem>
            </PaginationContent>

            {/* Page Info - Show on mobile for better UX */}
            {isMobile && (
                <div className="text-center mt-2">
                    <span className="text-sm text-deep-purple-600 dark:text-deep-purple-300 font-medium">
                        Halaman {currentPage} dari {pageCount}
                    </span>
                </div>
            )}

            {/* Page Info for Desktop */}
            {!isMobile && (
                <div className="text-center mt-2">
                    <span className="text-sm text-deep-purple-600 dark:text-deep-purple-300 font-medium">
                        Halaman {currentPage} dari {pageCount}
                    </span>
                </div>
            )}
        </Pagination>
    )
}