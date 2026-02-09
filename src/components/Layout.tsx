import { Link, Outlet, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '../styles/constants';
import { useAuthStore } from '../stores/authStore';
import { Button } from './common/Button';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${colors.background.default};
`;

const Header = styled.header`
  background-color: ${colors.background.white};
  border-bottom: 1px solid ${colors.border.default};
  position: sticky;
  top: 0;
  z-index: 50;
`;

const HeaderInner = styled.div`
  max-width: 64rem; /* max-w-5xl, increased to match BoardList */
  margin: 0 auto;
  padding: 0 1.25rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 640px) {
    padding: 0 1rem;
    height: 3.5rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${colors.primary.main};
  letter-spacing: -0.025em;
  transition: color 0.15s;

  &:hover {
    color: ${colors.primary.hover};
  }
`;

const Nav = styled.nav``;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 640px) {
    gap: 0.5rem;
  }
`;

const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${colors.text.heading};

  @media (max-width: 640px) {
    font-size: 0.75rem;
  }
`;

const UserEmail = styled.span`
  font-size: 0.75rem;
  color: ${colors.text.tertiary};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  margin: 0 auto;
`;

export default function Layout() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container>
      <Header>
        <HeaderInner>
          <Logo to="/">BIGS TODO</Logo>
          <Nav>
            {user && (
              <UserInfo>
                <UserName>{user.name}</UserName>
                <UserEmail>{user.username}</UserEmail>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                >
                  로그아웃
                </Button>
              </UserInfo>
            )}
          </Nav>
        </HeaderInner>
      </Header>
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
}
