import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { signup } from '../../api/auth';
import { colors } from '../../styles/constants';
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

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!%*#?&])[A-Za-z\d!%*#?&]{8,}$/;

export function SignupForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): string | null => {
    if (!form.username || !form.name || !form.password || !form.confirmPassword) {
      return '모든 항목을 입력해주세요.';
    }
    if (!PASSWORD_REGEX.test(form.password)) {
      return '비밀번호는 8자 이상, 영문/숫자/특수문자(!%*#?&)를 각 1개 이상 포함해야 합니다.';
    }
    if (form.password !== form.confirmPassword) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await signup(form);
      navigate('/login', { state: { message: '회원가입이 완료되었습니다. 로그인해주세요.' } });
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { 
          response?: { 
            status: number; 
            data?: { 
              message?: string;
              username?: string[];
            } 
          } 
        };

        if (axiosErr.response?.data?.username?.[0]) {
          setError(axiosErr.response.data.username[0]);
        } else if (axiosErr.response?.status === 409) {
          setError('이미 사용 중인 이메일입니다.');
        } else {
          setError(axiosErr.response?.data?.message || '회원가입에 실패했습니다.');
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
        <Title>회원가입</Title>
        <Subtitle>새로운 계정을 생성하여 시작하세요.</Subtitle>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Input
            id="username"
            label="이메일"
            type="email"
            value={form.username}
            onChange={(e) => updateField('username', e.target.value)}
            placeholder="example@bigs.or.kr"
            autoComplete="email"
          />
          <Input
            id="name"
            label="이름"
            type="text"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="이름을 입력하세요"
            autoComplete="name"
          />
          <Input
            id="password"
            label="비밀번호"
            type="password"
            value={form.password}
            onChange={(e) => updateField('password', e.target.value)}
            placeholder="8자 이상, 영문/숫자/특수문자 포함"
            autoComplete="new-password"
          />
          <Input
            id="confirmPassword"
            label="비밀번호 확인"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => updateField('confirmPassword', e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            autoComplete="new-password"
          />

          <Button type="submit" disabled={loading} fullWidth size="lg">
            {loading ? '가입 중...' : '회원가입'}
          </Button>
        </Form>
        
        <Footer>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </Footer>
      </AuthCard>
    </AuthContainer>
  );
}
