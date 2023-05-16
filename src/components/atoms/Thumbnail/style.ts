import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const AltThumbnail = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.COLOR.PRIMARY};
  color: ${({ theme }) => theme.COLOR.PRIMARY};
`;

export const thumbnailStyle = css`
  object-fit: cover;
`;
