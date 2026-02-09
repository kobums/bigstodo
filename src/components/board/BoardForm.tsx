import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '../../styles/constants';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { Select } from '../common/Select';
import { Card } from '../common/Card';

interface BoardFormProps {
  initialData?: {
    title: string;
    content: string;
    category: string;
    imageUrl: string | null;
  };
  categories: Record<string, string>;
  onSubmit: (data: { title: string; content: string; category: string }, file?: File) => Promise<void>;
  loading: boolean;
  isEdit?: boolean;
}

const Container = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.text.primary};
  margin-bottom: 2rem;
  
  @media (max-width: 640px) {
    margin-bottom: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ErrorMessage = styled.div`
  background-color: ${colors.danger.background};
  color: ${colors.danger.main};
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  text-align: center;
  border: 1px solid ${colors.danger.border};
`;

const ImagePreview = styled.div`
  margin-bottom: 0.5rem;
`;

const Image = styled.img`
  max-height: 12rem;
  border-radius: 0.5rem;
  object-fit: contain;
  border: 1px solid ${colors.border.default};
`;

const FileInput = styled.input`
  display: block;
  width: 100%;
  font-size: 0.875rem;
  color: ${colors.text.tertiary};

  &::file-selector-button {
    margin-right: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    border: none;
    font-size: 0.875rem;
    font-weight: 600;
    background-color: ${colors.primary.background};
    color: ${colors.primary.main};
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${colors.primary.border};
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.5rem;
  border-top: 1px solid ${colors.secondary.background};
`;

export function BoardForm({
  initialData = { title: '', content: '', category: '', imageUrl: null },
  categories,
  onSubmit,
  loading,
  isEdit = false,
}: BoardFormProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initialData.title);
  const [content, setContent] = useState(initialData.content);
  const [category, setCategory] = useState(initialData.category);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize category if not set
  if (!category && Object.keys(categories).length > 0) {
    setCategory(Object.keys(categories)[0]);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !content.trim() || !category) {
      setError('제목, 내용, 카테고리를 모두 입력해주세요.');
      return;
    }

    try {
      await onSubmit({ title: title.trim(), content: content.trim(), category }, file);
    } catch {
      setError(isEdit ? '수정에 실패했습니다.' : '등록에 실패했습니다.');
    }
  };

  return (
    <Container>
      <Heading>{isEdit ? '게시글 수정' : '게시글 작성'}</Heading>
      <Card>
        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Select
            id="category"
            label="카테고리"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {Object.entries(categories).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </Select>

          <Input
            id="title"
            label="제목"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />

          <Textarea
            id="content"
            label="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            rows={10}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="file" style={{ fontSize: '0.875rem', fontWeight: 500, color: colors.text.primary }}>
              첨부파일
            </label>
            {initialData.imageUrl && !file && (
              <ImagePreview>
                <Image
                  src={`https://front-mission.bigs.or.kr${initialData.imageUrl}`}
                  alt="기존 이미지"
                />
              </ImagePreview>
            )}
            <FileInput
              ref={fileInputRef}
              id="file"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0])}
            />
          </div>

          <ButtonGroup>
            <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
              취소
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? '저장 중...' : isEdit ? '수정' : '등록'}
            </Button>
          </ButtonGroup>
        </Form>
      </Card>
    </Container>
  );
}
