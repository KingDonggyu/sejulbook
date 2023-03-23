import styled from '@emotion/styled';

export const Wrapper = styled.div`
  margin: auto;
  padding: 0 50px;
  max-width: ${({ theme }) => theme.MAX_WIDTH.TABLET};
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    padding: 0;
  }
`;

export const Title = styled.h1`
  line-height: 1.5;
  text-align: center;
  padding: 40px 0;
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_LARGE};
  & > span:first-of-type {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
  }
  & > span:last-of-type {
    color: ${({ theme }) => theme.COLOR.PRIMARY};
  }
`;
