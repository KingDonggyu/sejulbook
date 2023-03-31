import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const TabContentWrapper = styled.div`
  margin: auto;
  width: 100%;
`;

export const CategoryWrapper = styled.div`
  margin: auto;
  width: 100%;
  button {
    width: 100%;
  }
`;

export const searchTabsStyle = (theme: Theme) =>
  css`
    background: ${theme.COLOR.BOX};
  `;

export const bookReviewSearchTabsStyle = (theme: Theme) => css`
  grid-template-columns: repeat(8, 1fr);
  @media screen and (max-width: ${theme.MAX_WIDTH.TABLET}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
