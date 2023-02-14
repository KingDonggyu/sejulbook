import styled from '@emotion/styled';
import { editorContentStyle } from '@/styles/editor';

export const EditorContainer = styled.div<{ editorId: string }>`
  margin-bottom: 50px;
  #${({ editorId }) => editorId} {
    ${({ theme }) => editorContentStyle(theme)};
  }
`;
