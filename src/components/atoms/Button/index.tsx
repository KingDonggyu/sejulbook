import { ButtonHTMLAttributes } from 'react';
import { StyleProps } from '@emotion/react';
import { HiX } from '@react-icons/all-files/hi/HiX';

import { ColorVariant, ButtonVariant } from '@/constants';
import { useScreenModeContext } from '@/contexts/screenModeContext';
import getColorByColorVariant from '@/utils/getColorByColorVariant';
import useMobile from '@/hooks/useMobile';
import { iconButtonStyle } from '@/styles/common';
import * as s from './style';

type ButtonAttributes = {
  color?: ColorVariant;
  elevation?: number;
  radius?: number;
  variant?: ButtonVariant;
  hover?: boolean;
};

export type ButtonProps = ButtonAttributes &
  ButtonHTMLAttributes<HTMLButtonElement> &
  StyleProps;

const Button = ({
  type = 'button',
  color = ColorVariant.INHERIT,
  variant = ButtonVariant.TEXT,
  elevation = 0,
  radius,
  hover = true,
  ...buttonAttrs
}: ButtonProps) => {
  const { theme } = useScreenModeContext();
  const isMobile = useMobile();

  return (
    <s.Button
      type={type}
      elevation={elevation}
      color={getColorByColorVariant(color, theme)}
      variant={variant}
      radius={radius}
      hover={hover && !isMobile}
      disabled={!!buttonAttrs.disabled}
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
  <Button {...buttonProps} css={iconButtonStyle}>
    취소
    <HiX size={size} />
  </Button>
);

Button.Cancel = CancelButton;

export default Button;
