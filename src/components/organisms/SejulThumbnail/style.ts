import styled from '@emotion/styled';
import { THUMBNAIL_Z_INDEX } from '@/constants/zIndex';

export const ThumnailWrapper = styled.div<{ isGrayscale: boolean }>`
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: ${THUMBNAIL_Z_INDEX};
  font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};

  img {
    transition: all 1s;
    filter: ${({ isGrayscale }) => (isGrayscale ? 'brightness(0.5)' : 'none')};
  }

  @media (hover: hover) and (pointer: fine) {
    :hover {
      img {
        filter: brightness(0.3) !important;
        transform: scale(1.07);
        transition: 0.5s;
      }
      & > p {
        opacity: 1;
      }
      & > div {
        opacity: 0;
      }
    }
  }
`;

export const SejulBookReview = styled.p<{ isLarge: boolean }>`
  line-height: 2;
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
  opacity: 0;
  transition: all 1s;
  color: ${({ theme }) => theme.COLOR.WHITE};
  font-size: ${({ theme, isLarge }) =>
    isLarge ? theme.FONT_SIZE.MEDIUM : theme.FONT_SIZE.SMALL};
`;

export const DefaultContent = styled.div`
  opacity: 1;
  transition: all 0.5s;
`;
