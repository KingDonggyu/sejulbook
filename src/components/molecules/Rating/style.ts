import styled from '@emotion/styled';

export const Wrapper = styled.div<{ gap: number }>`
  cursor: pointer;
  width: fit-content;
  display: flex;
  gap: ${({ gap }) => gap}px;
`;
