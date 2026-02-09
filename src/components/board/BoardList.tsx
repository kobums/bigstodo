import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '../../styles/constants';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import Pagination from '../Pagination';

export interface Board {
  id: number;
  title: string;
  category: string;
  createdAt: string;
}

interface BoardListProps {
  boards: Board[];
  loading: boolean;
  totalElements: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  getCategoryLabel: (key: string) => string;
}

const Container = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.text.primary};
`;

const TotalCount = styled.span`
  font-size: 0.875rem;
  color: ${colors.text.tertiary};
`;

const TableContainer = styled.div`
  background-color: ${colors.background.white};
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid ${colors.border.default};
  overflow: hidden;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  min-width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background-color: ${colors.neutral.background};
`;

const Th = styled.th<{ width?: string; align?: 'left' | 'center' | 'right' }>`
  padding: 0.75rem 1.5rem;
  text-align: ${(props) => props.align || 'left'};
  font-size: 0.75rem;
  font-weight: 500;
  color: ${colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  width: ${(props) => props.width || 'auto'};

  /* Hide ID (1st) and Date (4th) columns on mobile */
  &:nth-of-type(1),
  &:nth-of-type(4) {
    @media (max-width: 640px) {
      display: none;
    }
  }
`;

const Tbody = styled.tbody`
  background-color: ${colors.background.white};
  & > tr {
    border-top: 1px solid ${colors.border.default};
    transition: background-color 0.2s;
    &:hover {
      background-color: ${colors.neutral.background};
    }
  }
`;

const Td = styled.td<{ align?: 'left' | 'center' | 'right' }>`
  padding: 1rem 1.5rem;
  white-space: nowrap;
  font-size: 0.875rem;
  color: ${colors.text.tertiary};
  text-align: ${(props) => props.align || 'left'};

  /* Hide ID (1st) and Date (4th) columns on mobile */
  &:nth-of-type(1),
  &:nth-of-type(4) {
    @media (max-width: 640px) {
      display: none;
    }
  }
`;

const BoardTitleLink = styled(Link)`
  display: block;
  font-weight: 500;
  color: ${colors.text.primary};
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  
  &:hover {
    color: ${colors.primary.main};
  }

  @media (min-width: 640px) {
    max-width: 28rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 5rem 1rem;
  color: ${colors.text.tertiary};
  background-color: ${colors.background.white};
  border-radius: 0.5rem;
  border: 1px solid ${colors.border.default};
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 5rem 1rem;
  color: ${colors.text.tertiary};
`;

export function BoardList({
  boards,
  loading,
  totalElements,
  page,
  totalPages,
  onPageChange,
  getCategoryLabel,
}: BoardListProps) {
  const getBadgeColor = (category: string) => {
    const lower = category.toLowerCase();
    if (lower === 'notice') return 'primary';
    if (lower === 'free') return 'success';
    if (lower === 'qna') return 'warning';
    return 'neutral';
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  return (
    <Container>
      <Header>
        <Title>게시판</Title>
        <HeaderRight>
          <TotalCount>총 {totalElements}개</TotalCount>
          <Link to="/boards/new">
            <Button size="sm">글쓰기</Button>
          </Link>
        </HeaderRight>
      </Header>

      {loading ? (
        <LoadingState>로딩 중...</LoadingState>
      ) : boards.length === 0 ? (
        <EmptyState>게시글이 없습니다.</EmptyState>
      ) : (
        <>
          <TableContainer>
            <TableWrapper>
              <Table>
                <Thead>
                  <tr>
                    <Th width="4rem" align="center">번호</Th>
                    <Th>제목</Th>
                    <Th width="7rem" align="center">카테고리</Th>
                    <Th width="8rem" align="center">작성일</Th>
                  </tr>
                </Thead>
                <Tbody>
                  {boards.map((board) => (
                    <tr key={board.id}>
                      <Td align="center">{board.id}</Td>
                      <Td>
                        <BoardTitleLink to={`/boards/${board.id}`}>
                          {board.title}
                        </BoardTitleLink>
                      </Td>
                      <Td align="center">
                        <Badge color={getBadgeColor(board.category)}>
                          {getCategoryLabel(board.category)}
                        </Badge>
                      </Td>
                      <Td align="center">
                        {formatDate(board.createdAt)}
                      </Td>
                    </tr>
                  ))}
                </Tbody>
              </Table>
            </TableWrapper>
          </TableContainer>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      )}
    </Container>
  );
}
