import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const modalStyle = css`
  padding: 20px;
  width: 330px;
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
  margin-bottom: 30px;
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.LIGHT};
  background: ${({ theme }) => theme.COLOR.BACKGROUND};
`;

export const EasyLoginDivider = styled.hr`
  position: relative;
  bottom: -7px;
  width: 100%;
  height: 0.5px;
  margin: 0;
  border: none;
  background: ${({ theme }) => theme.COLOR.SECOND_TEXT};
`;

export const LoginButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
`;
