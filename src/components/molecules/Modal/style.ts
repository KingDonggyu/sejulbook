import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Background = styled.div`
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

export const ModalWrapper = styled.div`
  z-index: 1;
`;

export const cancelButtonStyle = css`
  margin-left: auto;
  margin-bottom: 12px;
`;
