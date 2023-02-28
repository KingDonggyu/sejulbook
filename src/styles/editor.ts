import { css, Theme } from '@emotion/react';

export const editorContentStyle = (theme: Theme) => css`
  cursor: text;
  outline: none;
  color: ${theme.COLOR.TEXT};
  font-size: ${theme.FONT_SIZE.SMALL};

  &::before {
    color: ${theme.COLOR.SECOND_TEXT};
  }

  * {
    margin: revert;
    padding: revert;
  }

  p,
  h1,
  h2,
  h3 {
    margin: 20px 0;
    line-height: 1.7;
  }

  h1,
  h2,
  h3 {
    font-weight: ${theme.FONT_WEIGHT.BOLD};
  }

  h1 {
    font-size: ${theme.FONT_SIZE.EXTRA_LARGE};
  }

  h2 {
    font-size: ${theme.FONT_SIZE.LARGE};
  }

  h3 {
    font-size: ${theme.FONT_SIZE.MEDIUM};
  }

  blockquote {
    margin: 15px 0;
    padding: 1px 15px;
    border-left: 7px solid ${theme.COLOR.PRIMARY};
    background: ${theme.COLOR.BOX};
  }

  ul,
  ol {
    margin-left: 20px;
    padding: 10px 0;
    list-style: revert;
  }

  li {
    line-height: 1.9;
  }

  pre[class*='language-'] {
    margin: 10px 0;
    padding: 15px;
    tab-size: 2;
  }

  em {
    font-style: italic;
  }

  strong {
    font-weight: ${theme.FONT_WEIGHT.BOLD};
  }

  img {
    object-fit: cover;
    max-width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

export const editorToolbarStyle = css`
  & .tox.tox-tinymce.tox-tinymce-inline.tox-tinymce--toolbar-bottom {
    position: fixed !important;
    top: auto !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;

    & .tox-editor-header {
      width: 100%;
      max-width: none !important;
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 30%) !important;
    }

    & .tox-toolbar__primary {
      justify-content: center;
    }
  }
`;
