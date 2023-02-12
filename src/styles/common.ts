import { css, Theme } from '@emotion/react';

export const iconButtonStyle = css`
  lineheight: 0;
  overflow: hidden;
  text-indent: -9999px;
`;

export const responsiveMaxWidthStyle = (theme: Theme) => css`
  max-width: ${theme.TUMBNAIL.DEFAULT.W}px;
  @media screen and (max-width: ${theme.MAX_WIDTH.TABLET}) {
    max-width: ${theme.TUMBNAIL.TABLET.W}px;
  }
  @media screen and (max-width: ${theme.MAX_WIDTH.MOBILE}) {
    max-width: ${theme.TUMBNAIL.MOBILE.W}px;
  }
`;

export const bookThumbnailStyle = (theme: Theme) => css`
  width: ${theme.TUMBNAIL.DEFAULT.W}px;
  height: ${theme.TUMBNAIL.DEFAULT.H}px;
  @media screen and (max-width: ${theme.MAX_WIDTH.TABLET}) {
    width: ${theme.TUMBNAIL.TABLET.W}px;
    height: ${theme.TUMBNAIL.TABLET.H}px;
  }
  @media screen and (max-width: ${theme.MAX_WIDTH.MOBILE}) {
    width: ${theme.TUMBNAIL.MOBILE.W}px;
    height: ${theme.TUMBNAIL.MOBILE.H}px;
  }
`;

export const searchedItemThumbnailStyle = (theme: Theme) => css`
  width: ${theme.TUMBNAIL.SMALL.W}px;
  height: ${theme.TUMBNAIL.SMALL.H}px;
`;
