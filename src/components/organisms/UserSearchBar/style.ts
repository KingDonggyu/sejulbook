import styled from '@emotion/styled';

export const UserName = styled.div`
  line-height: 1.5;
  padding-bottom: 5px;
  span {
    font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.MYEONGJO_BOLD};
  }
`;

export const UserIntroduce = styled.div`
  line-height: 1.5;
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
`;
