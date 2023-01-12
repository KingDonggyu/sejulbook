import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  padding: 20px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.COLOR.LINE};
`;

export const RightItemsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;
