import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const boxStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  max-width: 240px;
  padding: 5px;
  gap: 15px;
  background: ${theme.COLOR.BOX};
  font-family: ${theme.FONT_FAMILY.nanumMyeongjo};
`;

export const InfoList = styled.dl`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
`;

export const BookTitle = styled.dd`
  line-height: 1.3;
  word-break: break-all;
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.MYEONGJO_BOLD};
`;

export const InfoItem = styled.div`
  display: flex;
  gap: 10px;
  line-height: 1.3;
  word-break: break-all;
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
`;

export const Label = styled.dt`
  min-width: 25px;
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
`;

export const Content = styled.dd``;
