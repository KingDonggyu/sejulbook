import styled from '@emotion/styled';

export const Background = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.COLOR.LINE};
`;

export const Wrapper = styled.div`
  margin: auto;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.MAX_WIDTH.DEFAULT};
`;

export const RightItemsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;

  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.DEFAULT}) {
    gap: 20px;
  }
`;
