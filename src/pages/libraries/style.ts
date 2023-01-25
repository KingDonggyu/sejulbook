import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const pageStyle = (theme: Theme) => css`
  margin: auto;
  max-width: 800px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${theme.MAX_WIDTH.MOBILE}) {
    padding: 40px 0;
  }
`;

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 50px;
  background: ${({ theme }) => theme.COLOR.LINE};
`;
