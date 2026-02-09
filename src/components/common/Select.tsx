import { type SelectHTMLAttributes, forwardRef } from 'react';
import styled from '@emotion/styled';
import { colors } from '../../styles/constants';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
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

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSelect = styled.select<{ hasError?: boolean }>`
  width: 100%;
  appearance: none;
  background-color: ${colors.background.white};
  border: 1px solid ${(props) => (props.hasError ? colors.danger.main : colors.border.input)};
  border-radius: 0.5rem;
  padding: 0.625rem 2.5rem 0.625rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${colors.text.primary};
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? colors.danger.main : colors.primary.main)};
    box-shadow: 0 0 0 2px ${(props) => (props.hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(3, 9, 91, 0.1)')};
  }
`;

const ArrowIcon = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 0.75rem;
  color: ${colors.text.tertiary};

  svg {
    height: 1rem;
    width: 1rem;
    fill: currentColor;
  }
`;

const ErrorText = styled.span`
  font-size: 0.75rem;
  color: ${colors.danger.main};
`;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className, children, ...props }, ref) => {
    return (
      <Wrapper className={className}>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <SelectWrapper>
          <StyledSelect ref={ref} hasError={!!error} {...props}>
            {children}
          </StyledSelect>
          <ArrowIcon>
            <svg viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
          </ArrowIcon>
        </SelectWrapper>
        {error && <ErrorText>{error}</ErrorText>}
      </Wrapper>
    );
  }
);
Select.displayName = 'Select';
