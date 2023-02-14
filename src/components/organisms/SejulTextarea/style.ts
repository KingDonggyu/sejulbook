import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 25px;
  & > img {
    width: 30px;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  line-height: 2;
  outline: none;
  border: none;
  resize: none;
  overflow: hidden;
  text-align: center;
  background: inherit;
  color: ${({ theme }) => theme.COLOR.TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};
  font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};
`;
