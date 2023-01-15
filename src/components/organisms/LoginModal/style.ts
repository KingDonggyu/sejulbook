import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const boxStyle = css`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  margin-bottom: 30px;
  color: ${({ theme }) => theme.COLOR.TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};
  & > span {
    color: ${({ theme }) => theme.COLOR.PRIMARY};
  }
`;

export const EasyLoginText = styled.span`
  z-index: 1;
  padding: 0 8px;
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
  background: ${({ theme }) => theme.COLOR.BACKGROUND};
`;

export const EasyLoginDivider = styled.hr`
  position: relative;
  bottom: -8px;
  width: 100%;
  height: 1px;
  margin: 0;
  border: none;
  background: ${({ theme }) => theme.COLOR.SECOND_TEXT};
`;
