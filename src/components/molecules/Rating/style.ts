import styled from '@emotion/styled';

export const Wrapper = styled.div<{ gap: number; readonly: boolean }>`
  ${({ readonly }) => !readonly && `cursor: pointer;`};
  width: fit-content;
  display: flex;
  gap: ${({ gap }) => gap}px;
`;
