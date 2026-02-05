import { useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBoard, deleteBoard, getCategories } from '../api/boards';
import { useBoardStore } from '../stores/boardStore';

export default function BoardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentBoard, setCurrentBoard, categories, setCategories, loading, setLoading } = useBoardStore();

  useEffect(() => {
    if (Object.keys(categories).length === 0) {
      getCategories().then(setCategories).catch(() => {});
    }
  }, [categories, setCategories]);

  const fetchBoard = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const board = await getBoard(Number(id));
      setCurrentBoard(board);
    } catch {
      navigate('/');
    }
    setLoading(false);
  }, [id, setCurrentBoard, setLoading, navigate]);

  useEffect(() => {
    fetchBoard();
    return () => setCurrentBoard(null);
  }, [fetchBoard, setCurrentBoard]);

  const handleDelete = async () => {
    if (!currentBoard || !confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deleteBoard(currentBoard.id);
      navigate('/');
    } catch {
      alert('삭제에 실패했습니다.');
    }
  };

  if (loading) return <div className="loading">로딩 중...</div>;
  if (!currentBoard) return <div className="empty">게시글을 찾을 수 없습니다.</div>;

  const getCategoryLabel = (key: string) => categories[key] || key;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString('ko-KR', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div className="board-detail-page">
      <article className="board-detail">
        <div className="board-detail-header">
          <span className={`badge badge-${currentBoard.boardCategory.toLowerCase()}`}>
            {getCategoryLabel(currentBoard.boardCategory)}
          </span>
          <h2 className="board-detail-title">{currentBoard.title}</h2>
          <time className="board-detail-date">{formatDate(currentBoard.createdAt)}</time>
        </div>

        {currentBoard.imageUrl && (
          <div className="board-detail-image">
            <img
              src={`https://front-mission.bigs.or.kr${currentBoard.imageUrl}`}
              alt="첨부 이미지"
            />
          </div>
        )}

        <div className="board-detail-content">
          {currentBoard.content}
        </div>

        <div className="board-detail-actions">
          <Link to="/" className="btn btn-outline">목록</Link>
          <div className="board-detail-actions-right">
            <Link to={`/boards/${currentBoard.id}/edit`} className="btn btn-secondary">수정</Link>
            <button onClick={handleDelete} className="btn btn-danger">삭제</button>
          </div>
        </div>
      </article>
    </div>
  );
}
