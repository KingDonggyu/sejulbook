import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { MODAL_Z_INDEX, NON_MODAL_Z_INDEX } from '@/constants/zIndex';

interface ModalStyleProps {
  isShowOverlay: boolean;
}

export const Background = styled.div<ModalStyleProps>`
  z-index: ${({ isShowOverlay }) =>
    isShowOverlay ? MODAL_Z_INDEX : NON_MODAL_Z_INDEX};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(11, 19, 30, 0.37);
`;

export const ModalWrapper = styled.div<ModalStyleProps>`
  z-index: ${({ isShowOverlay }) =>
    isShowOverlay ? MODAL_Z_INDEX : NON_MODAL_Z_INDEX};
  margin: 0 20px;
`;

export const cancelButtonStyle = css`
  margin-left: auto;
  margin-bottom: 12px;
`;
