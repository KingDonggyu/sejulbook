import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  gap: 15px;
  padding: 10px;
  border-radius: 5px;
  background: ${({ theme }) => theme.COLOR.BOX};
  box-shadow: 2px 4px 12px rgb(0 0 0 / 4%);
  font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};
`;

export const InfoList = styled.dl`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const InfoItem = styled.div`
  display: flex;
  gap: 10px;
  line-height: 1.2;
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
`;

export const Label = styled.dt`
  text-align: end;
  min-width: 43px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.DISPLAY};
`;

export const Content = styled.dd``;
