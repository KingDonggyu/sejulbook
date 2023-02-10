import { ReactNode } from 'react';
import { SideBarPosition } from '@/constants';
import Box from '@/components/atoms/Box';
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
        <Box elevation={4}>{children}</Box>
      </s.SideBarWrapper>
    </s.Background>
  );
};

export default SideBar;
