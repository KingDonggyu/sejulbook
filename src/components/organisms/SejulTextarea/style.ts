import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: auto;
  gap: 25px;
  & > img {
    width: 30px;
    height: auto;
  }
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    width: 100%;
  }
`;

export const Viewer = styled.div`
  line-height: 1.9;
  text-align: center;
  white-space: pre-line;
  font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};
  font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  }
`;

export const textAreaStyle = (theme: Theme) => css`
  text-align: center;
  font-size: ${theme.FONT_SIZE.MEDIUM};
  font-family: ${theme.FONT_FAMILY.nanumMyeongjo};
  @media screen and (max-width: ${theme.MAX_WIDTH.MOBILE}) {
    font-size: ${theme.FONT_SIZE.SMALL};
  }
`;
