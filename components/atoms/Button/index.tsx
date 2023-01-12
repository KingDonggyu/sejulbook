import { ButtonHTMLAttributes } from 'react';
import { StyleProps } from '@/types/style';
import { Color, ButtonVariant } from '@/types/constants';
import * as s from './style';

type CustomButtonAttributes = {
  color?: Color;
  variant?: ButtonVariant;
};

type ButtonProps = CustomButtonAttributes &
  ButtonHTMLAttributes<HTMLButtonElement> &
  StyleProps;

const Button = ({
  type = 'button',
  color = Color.INHERIT,
  variant = ButtonVariant.TEXT,
  css,
  style,
  ...buttonAttrs
}: ButtonProps) => (
  <s.Button
    color={color}
    variant={variant}
    type={type}
    css={css}
    style={style}
    {...buttonAttrs}
  />
);

export default Button;
