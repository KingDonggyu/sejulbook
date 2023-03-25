import styled from '@emotion/styled';

export const Wrapper = styled.li`
  padding: 10px !important;
  font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};

  a {
    display: flex;
    gap: 15px;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  line-height: 1.5;
`;

export const BookTitle = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};

  span {
    font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.MYEONGJO_BOLD};
  }
`;

export const Writer = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  span {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.MYEONGJO_BOLD};
  }
`;
