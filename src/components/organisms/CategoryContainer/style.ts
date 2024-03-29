import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';

export const Wrapper = styled.div`
  width: 100%;
  padding: 5px;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.TABLET}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Skeleton = styled.span`
  width: 130px;
  height: 50px;
  background-color: ${({ theme }) => theme.COLOR.LINE};
`;

export const categoryItemStyle = (theme: Theme) => css`
  line-height: 1.5;
  width: 130px;
  height: 50px;
  color: ${theme.COLOR.TEXT};
  font-size: ${theme.FONT_SIZE.EXTRA_SMALL};

  &:hover {
    color: ${theme.COLOR.PRIMARY};
    border-color: ${theme.COLOR.PRIMARY};
  }
`;
