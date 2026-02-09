import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '../../styles/constants';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface BoardDetailProps {
  board: {
    id: number;
    title: string;
    content: string;
    boardCategory: string;
    createdAt: string;
    imageUrl: string | null;
  };
  getCategoryLabel: (key: string) => string;
  onDelete: () => void;
}

const Container = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Article = styled.article`
  background-color: ${colors.background.white};
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid ${colors.border.default};
  overflow: hidden;
`;

const Header = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${colors.secondary.background};
  
  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

const HeaderMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Time = styled.time`
  font-size: 0.875rem;
  color: ${colors.text.tertiary};
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.text.primary};
  line-height: 1.25;

  @media (min-width: 640px) {
    font-size: 1.875rem;
  }
`;

const Content = styled.div`
  padding: 1.5rem 2rem;
  
  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

const ImageContainer = styled.div`
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid ${colors.secondary.background};
  background-color: ${colors.neutral.background};
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
`;

const TextContent = styled.div`
  color: ${colors.text.heading};
  line-height: 1.75;
  white-space: pre-wrap;
  min-height: 120px;
`;

const Footer = styled.div`
  padding: 1rem 1.5rem;
  background-color: ${colors.neutral.background};
  border-top: 1px solid ${colors.secondary.background};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export function BoardDetail({ board, getCategoryLabel, onDelete }: BoardDetailProps) {
  const getBadgeColor = (category: string) => {
    const lower = category.toLowerCase();
    if (lower === 'notice') return 'primary';
    if (lower === 'free') return 'success';
    if (lower === 'qna') return 'warning';
    return 'neutral';
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString('ko-KR', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <Container>
      <Article>
        <Header>
          <HeaderMeta>
            <Badge color={getBadgeColor(board.boardCategory)}>
              {getCategoryLabel(board.boardCategory)}
            </Badge>
            <Time>{formatDate(board.createdAt)}</Time>
          </HeaderMeta>
          <Title>{board.title}</Title>
        </Header>

        <Content>
          {board.imageUrl && (
            <ImageContainer>
              <Image
                src={`https://front-mission.bigs.or.kr${board.imageUrl}`}
                alt="첨부 이미지"
              />
            </ImageContainer>
          )}

          <TextContent>
            {board.content}
          </TextContent>
        </Content>

        <Footer>
          <Link to="/">
            <Button variant="outline">목록</Button>
          </Link>
          <ActionButtons>
            <Link to={`/boards/${board.id}/edit`}>
              <Button variant="secondary">수정</Button>
            </Link>
            <Button variant="danger" onClick={onDelete}>
              삭제
            </Button>
          </ActionButtons>
        </Footer>
      </Article>
    </Container>
  );
}
