import emotionReset from 'emotion-reset';
import { css, Theme } from '@emotion/react';

const globalStyle = (theme: Theme) => css`
  ${emotionReset}

  *, *::after, *::before {
    box-sizing: border-box;
    font-family: ${theme.FONT_FAMILY.notoSansKR};
  }

  html {
    width: 100vw;
    height: 100vh;
    font-size: 80%;
    font-family: ${theme.FONT_FAMILY.notoSansKR};
  }

  body {
    width: 100%;
    height: 100%;
    color: ${theme.COLOR.TEXT};
    background-color: ${theme.COLOR.BACKGROUND};
  }

  #__next {
    width: 100%;
    height: 100%;
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
