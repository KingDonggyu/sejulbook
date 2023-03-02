import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { searchedItemThumbnailStyle } from '@/styles/common';

export const AltThumbnail = styled.div<{ width: number; height: number }>`
  ${({ theme }) => searchedItemThumbnailStyle(theme)};
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
