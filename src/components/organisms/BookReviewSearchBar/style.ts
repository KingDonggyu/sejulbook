import styled from '@emotion/styled';

export const Wrapper = styled.li`
  a {
    display: flex;
    gap: 15px;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  line-height: 1.5;
`;

export const BookTitle = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.MYEONGJO_BOLD};
`;

export const Author = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
`;

export const Writer = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
  span {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.MYEONGJO_BOLD};
  }
`;
