import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: auto;
  gap: 25px;
  & > img {
    width: 30px;
  }
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    width: 100%;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  line-height: 1.6;
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

export const Viewer = styled.div`
  line-height: 1.6;
  text-align: center;
  white-space: pre-line;
  font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};
  font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};
`;
