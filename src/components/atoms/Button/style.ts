import styled from '@emotion/styled';
import { ButtonVariant } from '@/constants';

interface ButtonStyleProps {
  color: string;
  elevation: number;
  variant: ButtonVariant;
  hover: boolean;
}

export const Button = styled.button<ButtonStyleProps>`
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: ${(props) => (props.variant === ButtonVariant.OUTLINED ? '8px' : 0)};

  background-color: ${(props) =>
    props.variant === ButtonVariant.CONTAINED ? props.color : 'inherit'};

  border: ${(props) =>
    props.variant === ButtonVariant.OUTLINED
      ? `1px solid ${props.color}`
      : 'none'};

  color: ${(props) =>
    props.variant === ButtonVariant.CONTAINED
      ? props.theme.COLOR.WHITE
      : props.theme.COLOR.TEXT};

  ${({ theme, elevation }) =>
    elevation &&
    `
    background: ${theme.COLOR.BACKGROUND};
    box-shadow: 0 1px 3px 0 rgb(0 0 0 /${elevation * 4}%);
  `};

  ${({ hover }) => hover && `&:hover { filter: opacity(0.8); }`}
`;
