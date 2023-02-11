import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const Title = styled.h2`
  margin: auto;
  margin-bottom: 20px;
  width: fit-content;
  font-size: ${({ theme }) => theme.FONT_SIZE.LARGE};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
`;

export const Wrapper = styled.div`
  max-height: 500px;
  padding: 5px;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  overflow-y: auto;
  overflow-x: hidden;

  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.TABLET}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const categoryItemStyle = (theme: Theme) => css`
  width: 130px;
  height: 50px;
  color: ${theme.COLOR.TEXT};
  font-size: ${theme.FONT_SIZE.EXTRA_SMALL};
  &:hover {
    color: ${theme.COLOR.PRIMARY};
    border-color: ${theme.COLOR.PRIMARY};
  }
`;

export const categoryButtonStyle = css`
  padding: 5px 8px;
`;
