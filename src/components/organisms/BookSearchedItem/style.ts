import styled from '@emotion/styled';
import { searchedItemThumbnailStyle } from '@/styles/common';

export const SearchedItemWrapper = styled.li`
  display: flex;
  gap: 10px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};
`;

export const AltTumbnail = styled.div`
  ${searchedItemThumbnailStyle}
  width: 60px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.COLOR.PRIMARY};
  color: ${({ theme }) => theme.COLOR.PRIMARY};
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  line-height: 1.3;
`;

export const BookTitle = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.DISPLAY};
`;

export const BookAuthors = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
`;

export const BookPublisher = styled.div`
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
`;
