import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createBoard, updateBoard, getBoard, getCategories } from '../api/boards';
import { useBoardStore } from '../stores/boardStore';
import { BoardForm } from '../components/board/BoardForm';
import { colors } from '../styles/constants';

export default function BoardFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { categories, setCategories } = useBoardStore();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<{
    title: string;
    content: string;
    category: string;
    imageUrl: string | null;
  } | null>(null);

  useEffect(() => {
    if (Object.keys(categories).length === 0) {
      getCategories().then(setCategories).catch(() => {});
    }
  }, [categories, setCategories]);

  useEffect(() => {
    if (!isEdit || !id) {
       setInitialData({ title: '', content: '', category: '', imageUrl: null });
       return;
    }
    
    setLoading(true);
    getBoard(Number(id)).then((board) => {
      setInitialData({
        title: board.title,
        content: board.content,
        category: board.boardCategory,
        imageUrl: board.imageUrl,
      });
    }).catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [id, isEdit, navigate]);

  const handleSubmit = async (data: { title: string; content: string; category: string }, file?: File) => {
    setLoading(true);
    try {
      if (isEdit) {
        await updateBoard(Number(id), data, file);
        navigate(`/boards/${id}`, { replace: true });
      } else {
        const result = await createBoard(data, file);
        navigate(`/boards/${result.id}`, { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && !initialData) return <div style={{ textAlign: 'center', padding: '5rem 0', color: colors.text.tertiary }}>로딩 중...</div>;
  if (!initialData && isEdit) return <div style={{ textAlign: 'center', padding: '5rem 0', color: colors.text.tertiary }}>데이터를 불러오는 중...</div>;

  return (
    <BoardForm
      initialData={initialData || undefined}
      categories={categories}
      onSubmit={handleSubmit}
      loading={loading}
      isEdit={isEdit}
    />
  );
}
