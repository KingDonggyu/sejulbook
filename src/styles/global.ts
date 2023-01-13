import emotionReset from 'emotion-reset';
import { css, Theme } from '@emotion/react';

const globalStyle = (theme: Theme) => css`
  ${emotionReset}

  *, *::after, *::before {
    box-sizing: border-box;
  }

  html {
    width: 100vw;
    height: 100vh;
  }

  body {
    width: 100%;
    height: 100%;
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
