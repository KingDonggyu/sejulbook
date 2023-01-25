import styled from '@emotion/styled';

export const Wrapper = styled.div``;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  & > * {
    margin: auto;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 15px;
  margin: 20px 0;
  background: ${({ theme }) => theme.COLOR.BROWN};
  box-shadow: 0 3px 3px 0 rgb(0 0 0 / 30%);
`;
