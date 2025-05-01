import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  onPageChange: (page: number) => void;
};

const CustomPagination = ({
  meta = { page: 1, limit: 10, total: 0, totalPage: 1 },
  onPageChange,
}: PaginationProps) => {
  const { page, totalPage } = meta;

  const renderPageLinks = () => {
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === page}
            onClick={(e) => {
              e.preventDefault();
              if (i !== page) onPageChange(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {page > 1 ? (
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page - 1);
              }}
            />
          ) : (
            <PaginationPrevious
              href="#"
              className="pointer-events-none opacity-50"
            />
          )}
        </PaginationItem>

        {renderPageLinks()}

        {totalPage > 5 && <PaginationEllipsis />}

        <PaginationItem>
          {page < totalPage ? (
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page + 1);
              }}
            />
          ) : (
            <PaginationNext
              href="#"
              className="pointer-events-none opacity-50"
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
