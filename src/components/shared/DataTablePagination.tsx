import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

interface PaginationInfo {
  currentPage: number
  totalItems: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}

interface DataTablePaginationProps {
  pagination: PaginationInfo
  onPageChange: (page: number) => void
  className?: string
}

export function DataTablePagination({
  pagination,
  onPageChange,
  className = ''
}: DataTablePaginationProps) {
  const { currentPage, totalPages, hasNext, hasPrevious } = pagination;

  return (
    <div className={cn("flex items-center justify-between px-2", className)}>
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {currentPage} de {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="hidden size-8 lg:flex"
          onClick={() => onPageChange(1)}
          disabled={!hasPrevious}
        >
          <span className="sr-only">Aller à la première page</span>
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevious}
        >
          <span className="sr-only">Page précédente</span>
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
        >
          <span className="sr-only">Page suivante</span>
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="hidden size-8 lg:flex"
          onClick={() => onPageChange(totalPages)}
          disabled={!hasNext}
        >
          <span className="sr-only">Aller à la dernière page</span>
          <ChevronsRight />
        </Button>
      </div>
    </div>
  )
}