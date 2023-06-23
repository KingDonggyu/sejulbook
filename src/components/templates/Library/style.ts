import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const Wrapper = styled.main`
  margin: auto;
  padding: 6rem 20px;
  max-width: ${({ theme }) => theme.MAX_WIDTH.CONTENT};
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
  padding-bottom: 0;
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 25px;
    padding: 0;
  }
`;

export const TopSectionSkeleton = styled.div`
  width: 100%;
  height: 12vh;
`;

export const ButtonWrapper = styled.div`
  min-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 13px;
  & > button,
  & > * > button {
    padding: 5px 10px;
  }
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    width: 100%;
    flex-direction: row;
    align-items: center;
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
