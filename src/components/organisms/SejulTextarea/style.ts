import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  line-height: 1.5;
  outline: none;
  border: none;
  resize: vertical;
  border-radius: 4px;
  color: ${({ theme }) => theme.COLOR.TEXT};
  background: ${({ theme }) => theme.COLOR.BOX};
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
`;

export const boxStyle = (theme: Theme) => css`
  width: 100%;
  padding: 10px;
  &:focus-within {
    border-color: ${theme.COLOR.PRIMARY};
  }
`;
