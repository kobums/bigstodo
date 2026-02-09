import { type TextareaHTMLAttributes, forwardRef } from 'react';
import styled from '@emotion/styled';
import { colors } from '../../styles/constants';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${colors.text.primary};
`;

const StyledTextarea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  min-height: 120px;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => (props.hasError ? colors.danger.main : colors.border.input)};
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${colors.text.primary};
  background-color: ${colors.background.white};
  transition: all 0.2s;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? colors.danger.main : colors.primary.main)};
    box-shadow: 0 0 0 2px ${(props) => (props.hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(3, 9, 91, 0.1)')};
  }

  &::placeholder {
    color: ${colors.text.placeholder};
  }
`;

const ErrorText = styled.span`
  font-size: 0.75rem;
  color: ${colors.danger.main};
`;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <Wrapper className={className}>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <StyledTextarea ref={ref} hasError={!!error} {...props} />
        {error && <ErrorText>{error}</ErrorText>}
      </Wrapper>
    );
  }
);
Textarea.displayName = 'Textarea';
