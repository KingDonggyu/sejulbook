import { css, Theme } from '@emotion/react';

export const iconButtonStyle = css`
  lineheight: 0;
  overflow: hidden;
  text-indent: -9999px;
`;

export const BookThumbnailStyle = {
  DEFAULT_WIDTH: 170,
  DEFAULT_HEIGHT: 220,
  STYLE: (theme: Theme) => css`
    width: 170px;
    height: 220px;
    @media screen and (max-width: ${theme.MAX_WIDTH.MOBILE}) {
      width: 100px;
      height: 150px;
    }
  `,
};
