import { ReactNode } from 'react';
import { StyleProps } from '@emotion/react';
import { BoxVariant } from '@/constants';
import * as s from './style';

export type BoxProps = {
  variant?: BoxVariant;
  elevation?: number;
  radius?: number;
  children: ReactNode;
} & StyleProps;

const Box = ({
  variant = BoxVariant.ELEVATION,
  elevation = 2,
  radius = 4,
  children,
  ...boxAttrs
}: BoxProps) => (
  <s.Box
    variant={variant}
    elevation={variant === BoxVariant.ELEVATION ? elevation : 0}
    radius={radius}
    {...boxAttrs}
  >
    {children}
  </s.Box>
);

export default Box;
