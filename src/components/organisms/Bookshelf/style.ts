import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';

export const wrtieBookReviewButtonStyle = (theme: Theme) => css`
  width: 150px;
  height: 200px;
  & > span {
    font-size: ${theme.FONT_SIZE.LARGE};
  }
  & > svg > path {
    stroke-width: 1;
  }
`;

export const Wrapper = styled.div``;
