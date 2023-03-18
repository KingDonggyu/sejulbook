import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;

  button {
    opacity: 0.5;
    padding: 15px;
    height: fit-content;
    background: ${({ theme }) => theme.COLOR.LINE};

    position: absolute;
    top: 38%;
  }

  svg {
    color: ${({ theme }) => theme.COLOR.TEXT};
  }

  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    button {
      display: none;
    }
  }
`;

export const Scoller = styled.div<{ gap: number }>`
  display: flex;
  gap: ${({ gap }) => gap}px;
  overflow-x: auto;
  overflow-y: hidden;

  /* 크롬, 사파리, 오페라, 엣지 */
  &::-webkit-scrollbar {
    display: none;
  }
  /* 파이어폭스 */
  scrollbar-width: none;
`;
