import styled from '@emotion/styled';
import { editorContentStyle } from '@/styles/editor';

export const ViewerContainer = styled.div<{ editorId: string }>`
  #${({ editorId }) => editorId} {
    ${({ theme }) => editorContentStyle(theme)};
  }
`;
