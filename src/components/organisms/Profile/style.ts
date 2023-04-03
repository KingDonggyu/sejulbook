import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';

export const editProfileButtonStyle = (theme: Theme) => css`
  padding: 5px 0;
  @media screen and (max-width: ${theme.MAX_WIDTH.MOBILE}) {
    width: 100%;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    gap: 20px;
  }
`;

export const Title = styled.h1`
  line-height: 1.5;
  font-size: ${({ theme }) => theme.FONT_SIZE.LARGE};
  & > span {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.MYEONGJO_BOLD};
  }
`;

export const Introduce = styled.p`
  line-height: 1.5;
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
`;

export const BottomWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

export const DetailWrapper = styled.dl`
  display: flex;
  gap: 25px;
  button {
    font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};
  }
`;

export const DatailItem = styled.dd`
  & > a:hover {
    border-bottom: 1px solid ${({ theme }) => theme.COLOR.TEXT};
  }
  & span {
    margin-right: 5px;
  }
  & em {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
  }
`;
