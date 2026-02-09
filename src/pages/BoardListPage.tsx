import { useEffect, useCallback } from 'react';
import { getBoards, getCategories } from '../api/boards';
import { useBoardStore } from '../stores/boardStore';
import { BoardList } from '../components/board/BoardList';

export default function BoardListPage() {
  const {
    boards, page, totalPages, totalElements, pageSize, loading,
    setBoards, setCategories, setPage, setLoading, categories,
  } = useBoardStore();

  useEffect(() => {
    if (Object.keys(categories).length === 0) {
      getCategories().then(setCategories).catch(() => {});
    }
  }, [categories, setCategories]);

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

  return (
    <BoardList
      boards={boards}
      loading={loading}
      totalElements={totalElements}
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      getCategoryLabel={getCategoryLabel}
    />
  );
}
