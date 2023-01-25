import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { BookThumbnailStyle } from '@/styles/common';

export const thumbnailStyle = (theme: Theme) => css`
  ${BookThumbnailStyle.STYLE(theme)}
  object-fit: cover;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const ThumnailWrapper = styled.div`
  cursor: pointer;
  position: relative;
`;

export const Title = styled.h2`
  max-width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    max-width: 100px;
  }
`;

export const Author = styled.h3`
  max-width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    max-width: 100px;
  }
`;

export const Rating = styled.div`
  display: flex;
  gap: 3px;
`;

export const Date = styled.p`
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
`;

export const TuhumnailBottomWrapper = styled.div`
  position: absolute;
  bottom: 8px;
  right: 5px;
  padding: 5px 7px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  box-shadow: 0 3px 3px 0 rgb(0 0 0 / 30%);
  background: ${({ theme }) => theme.COLOR.DEEP_GREY};
  color: ${({ theme }) => theme.COLOR.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};

  & > div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

export const LikeCount = styled.span`
  margin-right: 3px;
`;

export const CommentCount = styled.span``;
