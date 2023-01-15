import { ReactNode } from 'react';
import { BoxVariant } from '@/constants';
import { StyleProps } from '@/types/style';
import * as s from './style';

type BoxProps = {
  variant?: BoxVariant;
  elevation?: number;
  radius?: number;
  children: ReactNode;
} & StyleProps;

const Box = ({
  variant = BoxVariant.OUTLINED,
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
