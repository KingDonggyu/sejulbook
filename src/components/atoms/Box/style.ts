import styled from '@emotion/styled';
import { BoxVariant } from '@/constants';

interface BoxStyleProps {
  variant: BoxVariant;
  elevation: number;
  radius: number;
}

export const Box = styled.div<BoxStyleProps>`
  padding: 20px;
  background: ${({ theme }) => theme.COLOR.BOX};
  border-radius: ${({ radius }) => `${radius}px`};

  ${({ variant, elevation }) =>
    variant === BoxVariant.ELEVATION &&
    `
    box-shadow: 0 1px 3px 0 rgb(0 0 0 /${elevation * 4}%);
  `};

  ${({ theme, variant }) =>
    variant === BoxVariant.OUTLINED &&
    `
    border: 1px solid ${theme.COLOR.LINE}
  `};
`;
