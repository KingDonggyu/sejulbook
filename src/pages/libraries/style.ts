import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const pageStyle = (theme: Theme) => css`
  margin: auto;
  max-width: ${theme.MAX_WIDTH.CONTENT};
  padding-top: 30px;
  @media screen and (max-width: ${theme.MAX_WIDTH.MOBILE}) {
    padding: 20px 0;
    padding-bottom: 0;
  }
`;

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  margin: 30px 0;
  background: ${({ theme }) => theme.COLOR.LINE};
`;
