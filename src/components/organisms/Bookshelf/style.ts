import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import { bookThumbnailStyle } from '@/styles/common';

export const wrtieBookReviewButtonStyle = (theme: Theme) => css`
  ${bookThumbnailStyle(theme)};
  color: ${theme.COLOR.PRIMARY};
  margin: 0 auto !important;
  border: 1px solid;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    font-size: ${theme.FONT_SIZE.LARGE};
  }
  & > svg > path {
    stroke-width: 1;
  }
`;

export const spinnerStyle = css`
  margin: auto;
  display: block;
`;

export const Wrapper = styled.div``;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 20px;
  & > * {
    margin: auto;
  }
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    padding: 0px;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 20px;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.COLOR.LINE};
`;

export const AltText = styled.div`
  width: fit-content;
  margin: auto;
  margin-top: 100px;
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};
`;

export const IntersectTarget = styled.div`
  height: 1px;
`;
