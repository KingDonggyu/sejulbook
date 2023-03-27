import emotionReset from 'emotion-reset';
import { css, Theme } from '@emotion/react';
import { editorToolbarStyle } from './editor';

const globalStyle = (theme: Theme) => css`
  ${emotionReset}

  *, *:before, *:after {
    box-sizing: border-box;
    line-height: 1;
    font-weight: ${theme.FONT_WEIGHT.NORMAL};
    font-family: ${theme.FONT_FAMILY.notoSansKR};
    -webkit-font-smoothing: antialiased;
  }

  html {
    font-size: 80%;
    overflow-y: scroll;
    color: ${theme.COLOR.TEXT};
    background-color: ${theme.COLOR.BACKGROUND};
    font-family: ${theme.FONT_FAMILY.notoSansKR};
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
    font-weight: ${theme.FONT_WEIGHT.BOLD};
  }

  a {
    text-decoration: none;
    color: inherit;
    font-weight: ${theme.FONT_WEIGHT.BOLD};
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
