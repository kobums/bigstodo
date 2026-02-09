import { type ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { colors } from '../../styles/constants';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: 1px solid transparent;
  
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  
  /* Size variants */
  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return `
          padding: 0.375rem 0.75rem;
          font-size: 0.875rem;
        `;
      case 'lg':
        return `
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        `;
      default: // md
        return `
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        `;
    }
  }}

  /* Color variants */
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: ${colors.secondary.background};
          color: ${colors.secondary.main};
          &:hover { background-color: ${colors.secondary.hover}; }
        `;
      case 'danger':
        return `
          background-color: ${colors.danger.main};
          color: white;
          &:hover { background-color: ${colors.danger.hover}; }
        `;
      case 'outline':
        return `
          background-color: ${colors.background.white};
          color: ${colors.secondary.main};
          border-color: ${colors.secondary.border};
          &:hover { background-color: ${colors.neutral.background}; }
        `;
      default: // primary
        return `
          background-color: ${colors.primary.main};
          color: white;
          &:hover { background-color: ${colors.primary.hover}; }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export function Button(props: ButtonProps) {
  return <StyledButton {...props} />;
}
