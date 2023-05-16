import styled from '@emotion/styled';
import { THUMBNAIL_Z_INDEX } from '@/constants/zIndex';

export const ThumnailWrapper = styled.div`
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: ${THUMBNAIL_Z_INDEX};
  font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};

  @media (hover: hover) and (pointer: fine) {
    :hover {
      img {
        transform: scale(1.07);
        transition: 0.5s;
      }
    }
  }
`;

export const SejulBookReview = styled.p<{ isLarge: boolean }>`
  line-height: 1.7;
  overflow-y: auto;
  overflow-x: hidden;
  white-space: pre-line;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  padding: 10px;
  padding-bottom: 30px;
  height: 100%;
  color: ${({ theme }) => theme.COLOR.WHITE};
  font-size: ${({ theme, isLarge }) =>
    isLarge ? theme.FONT_SIZE.MEDIUM : theme.FONT_SIZE.SMALL};
`;
