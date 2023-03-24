import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const TabContentWrapper = styled.div`
  margin: auto;
  width: 100%;
`;

export const CategoryWrapper = styled.div`
  padding-top: 10px;
  margin: auto;
  width: 100%;
  button {
    width: 100%;
  }
`;

export const bookReviewSearchTabsStyle = (theme: Theme) => css`
  grid-template-columns: repeat(8, 1fr);
  @media screen and (max-width: ${theme.MAX_WIDTH.TABLET}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
