import styled from '@emotion/styled';
import { Color, ButtonVariant } from '@/types/constants';

export const Button = styled.button`
  padding: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({
    color,
    variant,
  }: {
    color: Color;
    variant: ButtonVariant;
  }) => (variant === ButtonVariant.CONTAINED ? color : 'inherit')};

  border: ${(props) =>
    props.variant === ButtonVariant.OUTLINED
      ? `1px solid ${props.color}`
      : 'none'};

  color: ${(props) =>
    props.variant === ButtonVariant.CONTAINED
      ? props.theme.COLOR.WHITE
      : props.color};

  &:hover {
    filter: opacity(0.7);
  }
`;
