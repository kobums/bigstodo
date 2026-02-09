import styled from '@emotion/styled';
import { colors } from '../../styles/constants';

interface BadgeProps {
  color?: 'primary' | 'success' | 'warning' | 'neutral';
  children: React.ReactNode;
}

const StyledBadge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  padding: 0.125rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1;

  ${({ color = 'neutral' }) => {
    switch (color) {
      case 'primary':
        return `
          background-color: ${colors.primary.background};
          color: ${colors.primary.main};
          border: 1px solid ${colors.primary.border};
        `;
      case 'success':
        return `
          background-color: ${colors.success.background};
          color: ${colors.success.main};
          border: 1px solid ${colors.success.border};
        `;
      case 'warning':
        return `
          background-color: ${colors.warning.background};
          color: ${colors.warning.main};
          border: 1px solid ${colors.warning.border};
        `;
      default: // neutral
        return `
          background-color: ${colors.neutral.background};
          color: ${colors.neutral.main};
          border: 1px solid ${colors.neutral.border};
        `;
    }
  }}
`;

export function Badge(props: BadgeProps) {
  return <StyledBadge {...props} />;
}
