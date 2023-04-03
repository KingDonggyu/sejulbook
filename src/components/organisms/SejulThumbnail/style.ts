import styled from '@emotion/styled';
import { THUMBNAIL_Z_INDEX } from '@/constants/zIndex';

export const ThumnailWrapper = styled.div`
  cursor: pointer;
  position: relative;
  z-index: ${THUMBNAIL_Z_INDEX};
  font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};
`;

export const SejulBookReview = styled.div`
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
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.TABLET}) {
    display: none;
  }
`;
