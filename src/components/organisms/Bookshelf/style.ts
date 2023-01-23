import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';

export const wrtieBookReviewButtonStyle = (theme: Theme) => css`
  width: 170px;
  height: 220px;
  & > span {
    font-size: ${theme.FONT_SIZE.LARGE};
  }
  & > svg > path {
    stroke-width: 1;
  }
`;

export const Wrapper = styled.div``;

export const Row = styled.div`
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
`;

export const Divider = styled.div`
  width: 100%;
  height: 15px;
  margin: 20px 0;
  background: ${({ theme }) => theme.COLOR.BROWN};
  box-shadow: 0 3px 3px 0 rgb(0 0 0 / 30%);
`;
