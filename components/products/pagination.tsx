interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
}

export const Pagination = ({ page, totalPages, setPage }: PaginationProps) => {
  return (
    <div className="flex justify-center items-center gap-2 md:gap-4 mt-20 flex-wrap">
      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-3 py-2 text-sm border border-gray-300 disabled:opacity-30"
      >
        ←
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }).map((_, i) => {
        const pageNumber = i + 1;

        // Show limited pages on mobile
        const isMobileVisible =
          pageNumber === page ||
          pageNumber === page - 1 ||
          pageNumber === page + 1;

        const active = page === pageNumber;

        return (
          <button
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
            className={`
              px-3 py-2 text-sm
              ${active ? "bg-[#507c59] text-white" : "border border-gray-300"}
              ${isMobileVisible ? "inline-block" : "hidden md:inline-block"}
            `}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next */}
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-3 py-2 text-sm border border-gray-300 disabled:opacity-30"
      >
        →
      </button>
    </div>
  );
};
