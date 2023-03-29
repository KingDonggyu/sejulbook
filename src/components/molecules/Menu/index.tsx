import { ReactNode, useRef } from 'react';
import Box, { BoxProps } from '@/components/atoms/Box';
import useClickOutside from '@/hooks/useClickOutside';
import * as s from './style';

export type MenuProps = {
  anchorEl: HTMLElement | null;
  divider?: boolean;
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
  elevation?: number;
  full?: boolean;
  children: ReactNode;
  handleClose: () => void;
} & BoxProps;

const Menu = ({
  anchorEl,
  divider = true,
  full = false,
  top = 20,
  bottom,
  right,
  left,
  children,
  handleClose,
  ...boxProps
}: MenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const isShowMenu = Boolean(anchorEl);

  useClickOutside(menuRef, handleClose);

  if (!isShowMenu) {
    return null;
  }

  return (
    <s.Background>
      <s.Wrapper
        ref={menuRef}
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
