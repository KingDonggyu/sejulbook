import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import { BookThumbnailStyle } from '@/styles/common';

export const wrtieBookReviewButtonStyle = (theme: Theme) => css`
  ${BookThumbnailStyle.STYLE(theme)}
  & > span {
    font-size: ${theme.FONT_SIZE.LARGE};
  }
  & > svg > path {
    stroke-width: 1;
  }
`;

export const Wrapper = styled.div``;

export const Row = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 10px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 15px;
  margin: 20px 0;
  background: ${({ theme }) => theme.COLOR.BROWN};
  box-shadow: 0 3px 3px 0 rgb(0 0 0 / 30%);
`;
