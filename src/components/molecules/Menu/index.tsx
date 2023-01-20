import { ReactNode } from 'react';
import { css } from '@emotion/react';
import { BoxVariant } from '@/constants';
import { StyleProps } from '@/types/style';
import Box from '@/components/atoms/Box';
import * as s from './style';

type MenuProps = {
  anchorEl: HTMLElement | null;
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
  elevation?: number;
  handleClose: () => void;
  children: ReactNode;
} & StyleProps;

const Menu = ({
  anchorEl,
  top = 20,
  bottom,
  right,
  left,
  elevation = 5,
  handleClose,
  children,
  ...styleProps
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
          variant={BoxVariant.OUTLINED}
          elevation={elevation}
          css={css`
            width: fit-content;
            padding: 0;
          `}
          {...styleProps}
        >
          <s.MenuList>{children}</s.MenuList>
        </Box>
      </s.Wrapper>
    </s.Background>
  );
};

type MenuItemProps = {
  divider?: boolean;
  children: ReactNode;
} & StyleProps;

export const MenuItem = ({
  divider = true,
  children,
  ...styleProps
}: MenuItemProps) => (
  <s.MenuItem divider={divider} {...styleProps}>
    {children}
  </s.MenuItem>
);

export default Menu;
