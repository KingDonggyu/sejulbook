import styled from '@emotion/styled';

export const SearchedItemWrapper = styled.li`
  display: flex;
  gap: 15px;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  line-height: 1.3;
`;

export const BookTitle = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.MYEONGJO_BOLD};
`;

export const BookAuthors = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
`;

export const BookPublisher = styled.div`
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
`;
