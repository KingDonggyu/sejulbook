import styled from '@emotion/styled';
import { SIDEBAR_Z_INDEX } from '@/constants/zIndex';
import { SideBarPosition } from '@/constants';
import { css } from '@emotion/react';

export const Background = styled.div`
  z-index: ${SIDEBAR_Z_INDEX};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const SideBarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

interface SideBarProps {
  isShow: boolean;
  position: SideBarPosition;
}

export const SideBarWrapper = styled.div<SideBarProps>`
  z-index: ${SIDEBAR_Z_INDEX};
  top: 0;
  bottom: 0;
  position: fixed;
  width: fit-content;

  & > div {
    height: 100%;
  }

  ${({ position }) =>
    position === SideBarPosition.LEFT ? `left: 0;` : `right: 0;`}

  animation-duration: 0.3s;
  animation-name: ${({ position }) =>
    position === SideBarPosition.LEFT ? `rightSlide` : `leftSlide`};

  @keyframes leftSlide {
    from {
      right: -100px;
    }
    to {
      right: 0;
    }
  }

  @keyframes rightSlide {
    from {
      left: -100px;
    }
    to {
      left: 0;
    }
  }
`;

export const cancelButtonStyle = css`
  margin-left: auto;
`;
