import emotionReset from 'emotion-reset';
import { css, Theme } from '@emotion/react';
import { editorToolbarStyle } from './editor';

const globalStyle = (theme: Theme) => css`
  ${emotionReset}

  *, *:before, *:after {
    box-sizing: border-box;
    line-height: 1;
    font-family: ${theme.FONT_FAMILY.notoSansKR};
    -webkit-font-smoothing: antialiased;
  }

  :root {
    font-size: 80%;
    overflow-y: scroll;
    transition: background-color 0.3s ease;
    color: ${theme.COLOR.TEXT};
    background-color: ${theme.COLOR.BACKGROUND};
    font-family: ${theme.FONT_FAMILY.notoSansKR};
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

  input::placeholder {
    color: ${theme.COLOR.SECOND_TEXT};
  }

  textarea::placeholder {
    color: ${theme.COLOR.SECOND_TEXT};
  }

  ${editorToolbarStyle};
`;

export default globalStyle;
