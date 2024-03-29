import styled from '@emotion/styled';

export const Wrapper = styled.main`
  margin: auto;
  padding: 6rem 20px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  max-width: ${({ theme }) => theme.MAX_WIDTH.POST};
`;

export const Header = styled.header`
  padding: 10px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};
  border-bottom: 1px solid ${({ theme }) => theme.COLOR.LINE};
`;

export const HeaderTop = styled.div`
  margin-bottom: 15px;
  display: flex;
  height: 13px;
`;

export const BookName = styled.h1`
  line-height: 1.4;
  margin-bottom: 50px;
  text-align: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.DISPLAY};
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    font-size: ${({ theme }) => theme.FONT_SIZE.LARGE};
  }
`;

export const Category = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
  }
`;

export const EditDeleteButtonWrapper = styled.div`
  z-index: 1;
  margin-left: auto;
  & svg {
    color: ${({ theme }) => theme.COLOR.PRIMARY};
  }
`;

export const HeaderBottom = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};
    font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
    @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
      margin-left: auto;
    }
  }
`;

export const WritingInfo = styled.div`
  span {
    margin: 0 8px;
    color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
    @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
      visibility: hidden;
    }
  }
  a {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.MYEONGJO_BOLD};
  }
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    display: flex;
    flex-direction: column;
  }
`;

export const Writer = styled.h2`
  display: inline-block;
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
`;

export const DateCreated = styled.time`
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
`;

export const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.COLOR.LINE};
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  a {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
  }
`;

export const Rating = styled.div``;
