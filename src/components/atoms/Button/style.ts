import styled from '@emotion/styled';
import { ButtonVariant } from '@/constants';

interface ButtonStyleProps {
  color: string;
  elevation: number;
  radius?: number;
  variant: ButtonVariant;
  hover: boolean;
  disabled: boolean;
}

export const Button = styled.button<ButtonStyleProps>`
  width: fit-content;
  border-radius: ${({ radius, variant }) =>
    radius === undefined && variant !== ButtonVariant.TEXT
      ? '4px'
      : `${radius}px`};

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
  padding: ${(props) => (props.variant !== ButtonVariant.TEXT ? '8px' : 0)};

  border: ${(props) =>
    props.variant === ButtonVariant.OUTLINED
      ? `1px solid ${props.color}`
      : 'none'};

  background-color: ${({ variant, color, theme }) =>
    variant === ButtonVariant.CONTAINED && color !== theme.COLOR.TEXT
      ? color
      : theme.COLOR.BOX};

  color: ${(props) =>
    props.variant === ButtonVariant.CONTAINED
      ? props.theme.COLOR.TEXT
      : props.color};

  ${({ elevation }) =>
    elevation &&
    `
    box-shadow: 0 1px 3px 0 rgb(0 0 0 /${elevation * 4}%);
  `};

  ${({ variant }) => variant === ButtonVariant.TEXT && `background: inherit;`};

  ${({ disabled, hover }) =>
    !disabled && hover && `&:hover { filter: opacity(0.8); }`}

  ${({ disabled }) =>
    disabled &&
    `
    cursor: default;
    filter: saturate(0.5);
  `}
`;
