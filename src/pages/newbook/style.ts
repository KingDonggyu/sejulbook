import styled from '@emotion/styled';

export const ButtonWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  & > button {
    width: 80px;
  }
`;

export const Wrapper = styled.div`
  margin-top: 5rem;
  gap: 50px;
  display: flex;
  flex-direction: column;
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
