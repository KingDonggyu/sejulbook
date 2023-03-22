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
  margin-top: 40px;
  margin-bottom: 20px;
  padding-bottom: 45px;
  border-bottom: 1px solid ${({ theme }) => theme.COLOR.PRIMARY};
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_LARGE};
  & > span {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
  }
  & > span:last-of-type {
    color: ${({ theme }) => theme.COLOR.PRIMARY};
  }
`;
