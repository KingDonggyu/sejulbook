import { ButtonHTMLAttributes } from 'react';
import { ColorVariant, ButtonVariant } from '@/constants';
import { StyleProps } from '@/types/style';
import { useScreenModeContext } from '@/contexts/screenModeContext';
import getColorByColorVariant from '@/utils/getColorByColorVariant';
import * as s from './style';

type ButtonAttributes = {
  color?: ColorVariant;
  variant?: ButtonVariant;
  hover?: boolean;
};

type ButtonProps = ButtonAttributes &
  ButtonHTMLAttributes<HTMLButtonElement> &
  StyleProps;

const Button = ({
  type = 'button',
  color = ColorVariant.INHERIT,
  variant = ButtonVariant.TEXT,
  hover = true,
  ...buttonAttrs
}: ButtonProps) => {
  const { theme } = useScreenModeContext();

  return (
    <s.Button
      type={type}
      color={getColorByColorVariant(color, theme)}
      variant={variant}
      hover={hover}
      {...buttonAttrs}
    />
  );
};

export default Button;
