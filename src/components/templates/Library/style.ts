import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  margin: auto;
  max-width: ${({ theme }) => theme.MAX_WIDTH.CONTENT};
  padding-top: 30px;
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    padding: 20px 0;
    padding-bottom: 0;
  }
`;

export const editProfileButtonStyle = (theme: Theme) => css`
  padding: 5px;
  @media screen and (max-width: ${theme.MAX_WIDTH.MOBILE}) {
    width: 100%;
  }
`;

export const TopSectionWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 20px;
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 25px;
    padding: 0;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    width: 100%;
    flex-direction: row;
    & > button:first-of-type {
      flex-grow: 1;
    }
  }
`;

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  margin: 20px 0;
  background: ${({ theme }) => theme.COLOR.LINE};
`;
