import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const pageStyle = css`
  margin: auto;
  width: 800px;
  padding: 40px;
  display: flex;
  flex-direction: column;
`;

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 50px;
  background: ${({ theme }) => theme.COLOR.LINE};
`;
