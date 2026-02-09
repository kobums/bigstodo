import styled from '@emotion/styled';
import { colors } from '../styles/constants';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  flex-wrap: wrap; 
`;

const PageBtn = styled.button<{ active?: boolean }>`
  padding: 0.5rem 0.875rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  border: 1px solid ${(props) => (props.active ? colors.primary.main : colors.border.default)};
  background-color: ${(props) => (props.active ? colors.primary.main : colors.background.white)};
  color: ${(props) => (props.active ? 'white' : colors.secondary.main)};
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: ${(props) => (props.active ? colors.primary.hover : colors.neutral.background)};
    border-color: ${(props) => (props.active ? colors.primary.hover : colors.secondary.border)};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: ${colors.background.white};
    border-color: ${colors.border.default};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(3, 9, 91, 0.2);
  }
`;



export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const maxVisible = 10;
  const currentBlock = Math.floor(page / maxVisible);
  const start = currentBlock * maxVisible;
  const end = Math.min(totalPages, start + maxVisible);

  const pages: number[] = [];
  for (let i = start; i < end; i++) {
    pages.push(i);
  }

  return (
    <Container>
      <PageBtn
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
      >
        이전
      </PageBtn>
      
      {pages.map((p) => (
        <PageBtn
          key={p}
          active={p === page}
          onClick={() => onPageChange(p)}
        >
          {p + 1}
        </PageBtn>
      ))}

      <PageBtn
        disabled={page === totalPages - 1}
        onClick={() => onPageChange(page + 1)}
      >
        다음
      </PageBtn>
    </Container>
  );
}
