import { css, Theme } from '@emotion/react';

export const thumbnailStyle = (theme: Theme) => css`
  object-fit: cover;
  border: 1px solid ${theme.COLOR.LINE};
`;

export const buttonStyle = (theme: Theme) => css`
  margin-top: 5px;
  width: ${theme.TUMBNAIL.DEFAULT.W}px;
  border-color: ${theme.COLOR.LINE};
`;
