import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const Title = styled.h2`
  margin: auto;
  margin-bottom: 20px;
  width: fit-content;
  font-size: ${({ theme }) => theme.FONT_SIZE.LARGE};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
`;

export const categoryContainerStyle = css`
  overflow-y: auto;
  overflow-x: hidden;
`;

export const categoryButtonStyle = (theme: Theme) => css`
  padding: 0;
  font-size: ${theme.FONT_SIZE.EXTRA_SMALL};
`;
