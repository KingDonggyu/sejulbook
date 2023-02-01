import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { responsiveMaxWidthStyle, bookThumbnailStyle } from '@/styles/common';
import { THUMBNAIL_Z_INDEX } from '@/constants/zIndex';

export const thumbnailStyle = (theme: Theme) => css`
  ${bookThumbnailStyle(theme)}
  object-fit: cover;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  max-width: ${({ theme }) => theme.TUMBNAIL.DEFAULT}px;
`;

export const Title = styled.h2`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
  ${({ theme }) => responsiveMaxWidthStyle(theme)};
`;

export const Author = styled.h3`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
`;

export const Rating = styled.div``;

export const Date = styled.p`
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
`;

export const ThumnailWrapper = styled.div`
  cursor: pointer;
  position: relative;
  z-index: ${THUMBNAIL_Z_INDEX};
`;

export const SejulBookReview = styled.div`
  line-height: 1.5;
  overflow-y: auto;
  overflow-x: hidden;
  white-space: pre-line;
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
  padding-bottom: 30px;
  color: ${({ theme }) => theme.COLOR.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};
  height: 100%;
`;

export const TuhumbnailBottomWrapper = styled.div`
  position: absolute;
  bottom: 8px;
  right: 5px;
  margin-left: auto;
  padding: 5px 7px;
  border-radius: 5px;
  display: flex;
  gap: 8px;
  box-shadow: 0 3px 3px 0 rgb(0 0 0 / 30%);
  background: ${({ theme }) => theme.COLOR.DEEP_GREY};
  color: ${({ theme }) => theme.COLOR.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
  & > div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    display: none;
  }
`;

export const LikeCount = styled.span`
  margin-right: 3px;
`;

export const CommentCount = styled.span``;
