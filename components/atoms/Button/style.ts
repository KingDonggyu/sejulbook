import styled from '@emotion/styled';
import { Color, ButtonVariant } from '@/types/constants';

interface ButtonStyleProps {
  color: Color;
  variant: ButtonVariant;
  hover: boolean;
}

export const Button = styled.button<ButtonStyleProps>`
  padding: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) =>
    props.variant === ButtonVariant.CONTAINED ? props.color : 'inherit'};

  border: ${(props) =>
    props.variant === ButtonVariant.OUTLINED
      ? `1px solid ${props.color}`
      : 'none'};

  color: ${(props) =>
    props.variant === ButtonVariant.CONTAINED
      ? props.theme.COLOR.WHITE
      : props.color};

  ${({ hover }) => hover && `&:hover { filter: opacity(0.8); }`}
`;
