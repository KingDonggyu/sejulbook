import emotionReset from 'emotion-reset';
import { css, Theme } from '@emotion/react';

const globalStyle = (theme: Theme) => css`
  ${emotionReset}

  *, *:before, *:after {
    box-sizing: border-box;
    line-height: 1;
    font-family: ${theme.FONT_FAMILY.nanumMyeongjo};
  }

  html {
    font-size: 80%;
    overflow-y: scroll;
    color: ${theme.COLOR.TEXT};
    background-color: ${theme.COLOR.BACKGROUND};
    font-family: ${theme.FONT_FAMILY.nanumMyeongjo};
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default globalStyle;
