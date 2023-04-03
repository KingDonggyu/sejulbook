import styled from '@emotion/styled';

export const Wrapper = styled.div`
  margin: auto;
  padding-top: 30px;
  max-width: ${({ theme }) => theme.MAX_WIDTH.CONTENT};
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.TABLET}) {
    padding-top: 10px;
  }
`;
