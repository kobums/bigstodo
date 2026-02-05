import { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getBoards, getCategories } from '../api/boards';
import { useBoardStore } from '../stores/boardStore';
import Pagination from '../components/Pagination';

export default function BoardListPage() {
  const {
    boards, page, totalPages, totalElements, pageSize, loading,
    setBoards, setCategories, setPage, setLoading, categories,
  } = useBoardStore();

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, [setCategories]);

  const fetchBoards = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getBoards(page, pageSize);
      setBoards(data.content, data.totalPages, data.totalElements, data.number);
    } catch { /* ignore */ }
    setLoading(false);
  }, [page, pageSize, setBoards, setLoading]);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  const getCategoryLabel = (key: string) => categories[key] || key;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  return (
    <div className="board-list-page">
      <div className="page-header">
        <h2>게시판</h2>
        <div className="page-header-right">
          <span className="total-count">총 {totalElements}개</span>
          <Link to="/boards/new" className="btn btn-primary btn-sm">글쓰기</Link>
        </div>
      </div>

      {loading ? (
        <div className="loading">로딩 중...</div>
      ) : boards.length === 0 ? (
        <div className="empty">게시글이 없습니다.</div>
      ) : (
        <>
          <div className="board-table">
            <div className="board-table-header">
              <span className="col-id">번호</span>
              <span className="col-title">제목</span>
              <span className="col-category">카테고리</span>
              <span className="col-date">작성일</span>
            </div>
            {boards.map((board) => (
              <Link to={`/boards/${board.id}`} key={board.id} className="board-table-row">
                <span className="col-id">{board.id}</span>
                <span className="col-title">{board.title}</span>
                <span className="col-category">
                  <span className={`badge badge-${board.category.toLowerCase()}`}>
                    {getCategoryLabel(board.category)}
                  </span>
                </span>
                <span className="col-date">{formatDate(board.createdAt)}</span>
              </Link>
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
