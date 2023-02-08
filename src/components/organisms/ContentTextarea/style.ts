import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';

export const EditorContainer = styled.div<{ isVisibleToolBar: boolean }>`
  margin-bottom: 50px;

  & * {
    border: none !important;
  }

  & .tox-editor-header {
    display: none !important;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background: ${({ theme }) => theme.COLOR.BOX} !important;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 30%) !important;
    display: ${({ isVisibleToolBar }) =>
      isVisibleToolBar ? `block !important` : `none !important`};
  }

  & .tox-toolbar__primary {
    justify-content: center;
    background: ${({ theme }) => theme.COLOR.BOX} !important;
  }

  & .tox-toolbar__primary button {
    cursor: pointer;
  }

  & .tox-toolbar__primary svg {
    cursor: pointer;
    fill: ${({ theme }) => theme.COLOR.TEXT} !important;
  }

  * .tox-collection__group > div:last-child {
    display: none !important;
  }

  & .tox-statusbar {
    display: none !important;
  }
`;

export const editorContentStyle = (theme: Theme) => css`
  body {
    cursor: text;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    font-family: ${theme.FONT_FAMILY} !important;
    background: ${theme.COLOR.BACKGROUND} !important;
    color: ${theme.COLOR.TEXT} !important;
  }

  body::before {
    color: ${theme.COLOR.SECOND_TEXT} !important;
  }
`;
