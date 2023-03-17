import styled from '@emotion/styled';
import { SIDEBAR_Z_INDEX } from '@/constants/zIndex';

export const Top = styled.div`
  z-index: ${SIDEBAR_Z_INDEX};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  border-bottom: 1px solid ${({ theme }) => theme.COLOR.LINE};
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    padding: 10px;
  }
`;

export const Logo = styled.div`
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    a {
      width: 80px;
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  & > button {
    width: 80px;
    font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
  }
`;

export const ContentWrapper = styled.div`
  margin: auto;
  margin-top: 5rem;
  gap: 50px;
  display: flex;
  flex-direction: column;
  max-width: ${({ theme }) => theme.MAX_WIDTH.POST};
`;

export const BookName = styled.h1`
  width: 100%;
  padding: 40px 0;
  margin: auto;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.COLOR.LINE};
  font-size: ${({ theme }) => theme.FONT_SIZE.DISPLAY};
  font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};
`;

export const ExceptionWrapper = styled.div`
  height: 50vh;
  gap: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.LARGE};
  font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};

  & > button {
    padding-bottom: 5px;
    border-radius: 0;
    border-bottom: 1px solid;
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
    font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  }
`;
