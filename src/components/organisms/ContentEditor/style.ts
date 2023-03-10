import styled from '@emotion/styled';
import { editorContentStyle } from '@/styles/editor';

interface EditorContainerProps {
  editorId: string;
  readonly: boolean;
}

export const EditorContainer = styled.div<EditorContainerProps>`
  ${({ readonly }) => !readonly && `min-height: 200px;margin-bottom: 50px;`};

  #${({ editorId }) => editorId} {
    ${({ theme }) => editorContentStyle(theme)};
    ${({ readonly }) => !readonly && `padding-bottom: 100px;`};
  }
`;
