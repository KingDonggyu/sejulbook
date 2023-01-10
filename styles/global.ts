import emotionReset from 'emotion-reset';
import { css } from '@emotion/react';

const globalStyle = css`
  ${emotionReset}

  *, *::after, *::before {
    box-sizing: border-box;
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
