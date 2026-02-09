import { type HTMLAttributes } from 'react';
import styled from '@emotion/styled';

const StyledCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #f1f5f9;
  padding: 2rem;
  width: 100%;

  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <StyledCard className={className} {...props}>{children}</StyledCard>;
}
