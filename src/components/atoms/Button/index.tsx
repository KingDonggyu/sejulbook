import { ButtonHTMLAttributes } from 'react';
import { StyleProps } from '@/src/types/style';
import { Color, ButtonVariant } from '@/src/types/constants';
import * as s from './style';

type CustomButtonAttributes = {
  color?: Color;
  variant?: ButtonVariant;
  hover?: boolean;
};

type ButtonProps = CustomButtonAttributes &
  ButtonHTMLAttributes<HTMLButtonElement> &
  StyleProps;

const Button = ({
  type = 'button',
  color = Color.INHERIT,
  variant = ButtonVariant.TEXT,
  hover = true,
  css,
  style,
  ...buttonAttrs
}: ButtonProps) => (
  <s.Button
    type={type}
    color={color}
    variant={variant}
    hover={hover}
    css={css}
    style={style}
    {...buttonAttrs}
  />
);

export default Button;
