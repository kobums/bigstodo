import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { signin } from '../../api/auth';
import { colors } from '../../styles/constants';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';

const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-color: ${colors.background.default};
`;

const AuthCard = styled(Card)`
  max-width: 28rem;
  padding: 2.5rem !important;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.875rem;
  font-weight: 700;
  color: ${colors.text.heading};
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 0.875rem;
  color: ${colors.text.tertiary};
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ErrorMessage = styled.div`
  background-color: ${colors.danger.background};
  color: ${colors.danger.main};
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 1rem;
  border: 1px solid ${colors.danger.border};
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: ${colors.text.tertiary};

  a {
    color: ${colors.primary.main};
    font-weight: 500;
    margin-left: 0.25rem;
    &:hover {
      color: ${colors.primary.hover};
    }
  }
`;

export function LoginForm() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const data = await signin({ username, password });
      setAuth(data.accessToken, data.refreshToken);
      navigate('/');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { status: number } };
        if (axiosErr.response?.status === 401) {
          setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        } else {
          setError('로그인에 실패했습니다. 다시 시도해주세요.');
        }
      } else {
        setError('네트워크 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <Title>로그인</Title>
        <Subtitle>서비스 이용을 위해 로그인이 필요합니다.</Subtitle>
        
        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Input
            id="username"
            label="이메일"
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="example@bigs.or.kr"
            autoComplete="email"
          />
          
          <Input
            id="password"
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            autoComplete="current-password"
          />
          
          <Button type="submit" disabled={loading} fullWidth size="lg">
            {loading ? '로그인 중...' : '로그인'}
          </Button>
        </Form>
        
        <Footer>
          계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </Footer>
      </AuthCard>
    </AuthContainer>
  );
}
