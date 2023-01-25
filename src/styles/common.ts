import { css, Theme } from '@emotion/react';

export const iconButtonStyle = css`
  lineheight: 0;
  overflow: hidden;
  text-indent: -9999px;
`;

export const BookThumbnailStyle = {
  DEFAULT_WIDTH: 250,
  DEFAULT_HEIGHT: 300,
  SMALL_WIDTH: 100,
  SMALL_HEIGHT: 150,
  STYLE: (theme: Theme) => css`
    width: 250px;
    height: 300px;
    @media screen and (max-width: ${theme.MAX_WIDTH.DEFAULT}) {
      width: 200px;
      height: 250px;
    }
    @media screen and (max-width: ${theme.MAX_WIDTH.MOBILE}) {
      width: 100px;
      height: 150px;
    }
  `,
};
