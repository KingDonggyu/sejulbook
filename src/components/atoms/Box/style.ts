import styled from '@emotion/styled';
import { BoxVariant } from '@/constants';

interface BoxStyleProps {
  variant: BoxVariant;
  elevation: number;
  radius: number;
}

export const Box = styled.div<BoxStyleProps>`
  padding: 20px;
  border-radius: ${({ radius }) => `${radius}px`};

  ${({ theme, variant, elevation }) =>
    variant === BoxVariant.ELEVATION &&
    `
    background: ${theme.COLOR.BACKGROUND};
    box-shadow: rgb(0 0 0 / ${elevation * 4}%) 2px 4px 12px;
  `};

  ${({ theme, variant }) =>
    variant === BoxVariant.OUTLINED &&
    `
    border: 1px solid ${theme.COLOR.LINE}
  `};
`;
