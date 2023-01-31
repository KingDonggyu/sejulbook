import { css, Theme } from '@emotion/react';

export const iconButtonStyle = css`
  lineheight: 0;
  overflow: hidden;
  text-indent: -9999px;
`;

export const responsiveMaxWidthStyle = (theme: Theme) => css`
  max-width: ${theme.BOOK_TUMBNAIL_WIDTH.DEFAULT}px;
  @media screen and (max-width: ${theme.MAX_WIDTH.TABLET}) {
    max-width: ${theme.BOOK_TUMBNAIL_WIDTH.TABLET}px;
  }
  @media screen and (max-width: ${theme.MAX_WIDTH.MOBILE}) {
    max-width: ${theme.BOOK_TUMBNAIL_WIDTH.MOBILE}px;
  }
`;

export const bookThumbnailStyle = (theme: Theme) => css`
  width: ${theme.BOOK_TUMBNAIL_WIDTH.DEFAULT}px;
  height: ${theme.BOOK_TUMBNAIL_WIDTH.DEFAULT + 70}px;
  @media screen and (max-width: ${theme.MAX_WIDTH.TABLET}) {
    width: ${theme.BOOK_TUMBNAIL_WIDTH.TABLET}px;
    height: ${theme.BOOK_TUMBNAIL_WIDTH.TABLET + 70}px;
  }
  @media screen and (max-width: ${theme.MAX_WIDTH.MOBILE}) {
    width: ${theme.BOOK_TUMBNAIL_WIDTH.MOBILE}px;
    height: ${theme.BOOK_TUMBNAIL_WIDTH.MOBILE + 50}px;
  }
`;

export const thumbnailSize = {
  smallWidth: 60,
  smallHeight: 90,
  mediumWidth: 120,
  mediumHeight: 174,
};

export const searchedItemThumbnailStyle = css`
  width: ${thumbnailSize.smallWidth};
  height: ${thumbnailSize.smallHeight};
`;
