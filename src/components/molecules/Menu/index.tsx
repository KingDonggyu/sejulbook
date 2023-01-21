import { ReactNode } from 'react';
import { css } from '@emotion/react';
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
  handleClose: () => void;
  children: ReactNode;
} & BoxProps;

const Menu = ({
  anchorEl,
  divider = true,
  top = 20,
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
      <s.Overlay onClick={handleClose} />
      <s.Wrapper top={top} bottom={bottom} right={right} left={left}>
        <Box
          css={css`
            width: fit-content;
            padding: 0;
          `}
          {...boxProps}
        >
          <s.MenuList divider={divider}>{children}</s.MenuList>
        </Box>
      </s.Wrapper>
    </s.Background>
  );
};

export default Menu;
