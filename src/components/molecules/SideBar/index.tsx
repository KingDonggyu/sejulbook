import { ReactNode } from 'react';
import { SideBarPosition } from '@/constants';
import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button';
import * as s from './style';

interface SideBarProps {
  anchorEl: HTMLElement | null;
  position?: SideBarPosition;
  children: ReactNode;
  handleClose: () => void;
}

const SideBar = ({
  anchorEl,
  position = SideBarPosition.RIGHT,
  children,
  handleClose,
}: SideBarProps) => {
  const isShowSideBar = Boolean(anchorEl);

  if (!isShowSideBar) {
    return null;
  }

  return (
    <s.Background>
      <s.SideBarOverlay onClick={handleClose} />
      <s.SideBarWrapper position={position}>
        <Box elevation={4}>
          <Button.Cancel
            size={20}
            onClick={handleClose}
            css={s.cancelButtonStyle}
          />
          {children}
        </Box>
      </s.SideBarWrapper>
    </s.Background>
  );
};

export default SideBar;
