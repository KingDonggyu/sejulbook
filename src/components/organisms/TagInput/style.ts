import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const textFieldStyle = (theme: Theme) => css`
  padding: 0 !important;
  font-size: ${theme.FONT_SIZE.EXTRA_SMALL};
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px;
`;

export const Hash = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
`;

export const HashTag = styled.span`
  display: flex;
  align-items: flex-start;
  gap: 1px;
  & > button {
    color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  }
`;
