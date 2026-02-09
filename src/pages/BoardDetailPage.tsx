import { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBoard, deleteBoard, getCategories } from '../api/boards';
import { useBoardStore } from '../stores/boardStore';
import { BoardDetail } from '../components/board/BoardDetail';

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

  const getCategoryLabel = (key: string) => categories[key] || key;

  if (loading || !currentBoard) return <div style={{ textAlign: 'center', padding: '5rem 0', color: '#64748b' }}>로딩 중...</div>;

  return (
    <BoardDetail
      board={currentBoard}
      getCategoryLabel={getCategoryLabel}
      onDelete={handleDelete}
    />
  );
}
