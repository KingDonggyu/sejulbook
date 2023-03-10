import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const boxStyle = (theme: Theme) => css`
  display: flex;
  padding: 5px;
  gap: 15px;
  background: ${theme.COLOR.BOX};
  font-family: ${theme.FONT_FAMILY.nanumMyeongjo};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  border-radius: 5px;
  background: ${({ theme }) => theme.COLOR.BOX};
  box-shadow: 2px 4px 12px rgb(0 0 0 / 4%);
  font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};
`;

export const InfoList = styled.dl`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const BookTitle = styled.dd`
  line-height: 1.3;
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.MYEONGJO_BOLD};
`;

export const InfoItem = styled.div`
  display: flex;
  gap: 10px;
  line-height: 1.3;
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
`;

export const Label = styled.dt`
  min-width: 25px;
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
`;

export const Content = styled.dd``;
