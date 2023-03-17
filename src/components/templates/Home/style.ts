import styled from '@emotion/styled';

export const Banner = styled.div`
  padding: 80px 0 80px 15%;
  margin-right: auto;
  padding-top: ${({ theme }) => theme.HEADERBAR_HEIGHT + 80}px;
  background: ${({ theme }) => theme.COLOR.PRIMARY};
`;

export const BannerContent = styled.div`
  margin-right: auto;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  color: ${({ theme }) => theme.COLOR.WHITE};
  font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};
  & > img:first-of-type {
    margin-bottom: 20px;
  }
  & > img:last-of-type {
    margin-top: 20px;
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.FONT_SIZE.DISPLAY};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.MYEONGJO_BOLD};
`;

export const SubTitle = styled.h2`
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_LARGE};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.MYEONGJO_BOLD};
`;
