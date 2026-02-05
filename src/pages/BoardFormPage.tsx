import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createBoard, updateBoard, getBoard, getCategories } from '../api/boards';
import { useBoardStore } from '../stores/boardStore';

export default function BoardFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { categories, setCategories } = useBoardStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState<File | undefined>(undefined);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (Object.keys(categories).length === 0) {
      getCategories().then(setCategories).catch(() => {});
    }
  }, [categories, setCategories]);

  useEffect(() => {
    if (!isEdit || !id) return;
    getBoard(Number(id)).then((board) => {
      setTitle(board.title);
      setContent(board.content);
      setCategory(board.boardCategory);
      setExistingImage(board.imageUrl);
    }).catch(() => navigate('/'));
  }, [id, isEdit, navigate]);

  useEffect(() => {
    if (!category && Object.keys(categories).length > 0) {
      setCategory(Object.keys(categories)[0]);
    }
  }, [categories, category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !content.trim() || !category) {
      setError('제목, 내용, 카테고리를 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const data = { title: title.trim(), content: content.trim(), category };
      if (isEdit) {
        await updateBoard(Number(id), data, file);
        navigate(`/boards/${id}`);
      } else {
        const result = await createBoard(data, file);
        navigate(`/boards/${result.id}`);
      }
    } catch {
      setError(isEdit ? '수정에 실패했습니다.' : '등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="board-form-page">
      <h2>{isEdit ? '게시글 수정' : '게시글 작성'}</h2>
      <form onSubmit={handleSubmit} className="board-form">
        {error && <p className="auth-error">{error}</p>}

        <div className="form-field">
          <label htmlFor="category">카테고리</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {Object.entries(categories).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
        </div>

        <div className="form-field">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            rows={10}
          />
        </div>

        <div className="form-field">
          <label htmlFor="file">첨부파일</label>
          {existingImage && !file && (
            <div className="existing-image">
              <img
                src={`https://front-mission.bigs.or.kr${existingImage}`}
                alt="기존 이미지"
              />
            </div>
          )}
          <input
            ref={fileInputRef}
            id="file"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0])}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>
            취소
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '저장 중...' : isEdit ? '수정' : '등록'}
          </button>
        </div>
      </form>
    </div>
  );
}
