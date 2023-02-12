import { ButtonHTMLAttributes } from 'react';
import { HiX } from '@react-icons/all-files/hi/HiX';
import { ColorVariant, ButtonVariant } from '@/constants';
import { StyleProps } from '@/types/style';
import { useScreenModeContext } from '@/contexts/screenModeContext';
import getColorByColorVariant from '@/utils/getColorByColorVariant';
import * as s from './style';

type ButtonAttributes = {
  color?: ColorVariant;
  elevation?: number;
  variant?: ButtonVariant;
  hover?: boolean;
};

export type ButtonProps = ButtonAttributes &
  ButtonHTMLAttributes<HTMLButtonElement> &
  StyleProps;

const Button = ({
  type = 'button',
  elevation = 0,
  color = ColorVariant.INHERIT,
  variant = ButtonVariant.TEXT,
  hover = true,
  ...buttonAttrs
}: ButtonProps) => {
  const { theme } = useScreenModeContext();

  return (
    <s.Button
      type={type}
      elevation={
        !elevation && variant === ButtonVariant.CONTAINED ? 4 : elevation
      }
      color={getColorByColorVariant(color, theme)}
      variant={variant}
      hover={hover}
      {...buttonAttrs}
    />
  );
};

const CancelButton = ({
  size,
  ...buttonProps
}: {
  size?: string | number;
} & ButtonProps) => (
  <Button {...buttonProps}>
    <HiX size={size} />
  </Button>
);

Button.Cancel = CancelButton;

export default Button;
