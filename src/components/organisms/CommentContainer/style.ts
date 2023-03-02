import styled from '@emotion/styled';

export const TextAreaWrapper = styled.div`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid ${({ theme }) => theme.COLOR.LINE};
  &:focus-within {
    border-color: ${({ theme }) => theme.COLOR.PRIMARY};
  }
  textarea {
    margin-bottom: 15px;
    font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
  }
  button {
    width: 60px;
    margin-left: auto;
    color: ${({ theme }) => theme.COLOR.WHITE};
    font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
  }
`;

export const CommentList = styled.div`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.COLOR.LINE};
`;

export const CommentWrapper = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.COLOR.LINE};
  a {
    margin-right: 10px;
    font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
  }
  time {
    color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
    font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
  }
  &:first-of-type {
    padding-top: 0;
  }
  &:last-of-type {
    padding-bottom: 0;
    border-bottom: none;
  }
`;

export const CommentInfo = styled.div`
  margin-bottom: 15px;
`;

export const CommentContent = styled.div``;
