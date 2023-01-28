import { ReactNode } from 'react';
import Box, { BoxProps } from '@/components/atoms/Box';
import * as s from './style';

type MenuProps = {
  anchorEl: HTMLElement | null;
  divider?: boolean;
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
  elevation?: number;
  full?: boolean;
  handleClose: () => void;
  children: ReactNode;
} & BoxProps;

const Menu = ({
  anchorEl,
  divider = true,
  top = 20,
  full = false,
  bottom,
  right,
  left,
  handleClose,
  children,
  ...boxProps
}: MenuProps) => {
  const isShowMenu = Boolean(anchorEl);

  if (!isShowMenu) {
    return null;
  }

  return (
    <s.Background>
      {/* <s.Overlay onClick={handleClose} /> */}
      <s.Wrapper
        top={top}
        bottom={bottom}
        right={right}
        left={left}
        full={full}
      >
        <Box css={s.boxStyle} {...boxProps}>
          <s.MenuList divider={divider}>{children}</s.MenuList>
        </Box>
      </s.Wrapper>
    </s.Background>
  );
};

export default Menu;
