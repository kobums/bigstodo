interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  const maxVisible = 5;
  let start = Math.max(0, page - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages, start + maxVisible);
  if (end - start < maxVisible) {
    start = Math.max(0, end - maxVisible);
  }

  for (let i = start; i < end; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
      >
        이전
      </button>
      {start > 0 && (
        <>
          <button className="pagination-num" onClick={() => onPageChange(0)}>1</button>
          {start > 1 && <span className="pagination-dots">...</span>}
        </>
      )}
      {pages.map((p) => (
        <button
          key={p}
          className={`pagination-num ${p === page ? 'active' : ''}`}
          onClick={() => onPageChange(p)}
        >
          {p + 1}
        </button>
      ))}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="pagination-dots">...</span>}
          <button className="pagination-num" onClick={() => onPageChange(totalPages - 1)}>
            {totalPages}
          </button>
        </>
      )}
      <button
        className="pagination-btn"
        disabled={page === totalPages - 1}
        onClick={() => onPageChange(page + 1)}
      >
        다음
      </button>
    </div>
  );
}
