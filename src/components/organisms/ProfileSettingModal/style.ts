import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const buttonStyle = (theme: Theme) => css`
  width: 100%;
  margin-top: 20px;
  color: ${theme.COLOR.BLUE_WHITE};
  font-weight: ${theme.FONT_WEIGHT.BOLD};
  font-size: ${theme.FONT_SIZE.SMALL};
`;

export const Form = styled.form`
  width: 300px;
  & > div {
    margin-bottom: 20px;
  }
  textarea {
    border-radius: 5px;
  }
  a {
    display: block;
    width: fit-content;
    margin: auto;
    padding-top: 20px;
    color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  }
`;

export const Title = styled.h2`
  width: fit-content;
  margin: auto;
  margin-bottom: 20px;
  font-size: ${({ theme }) => theme.FONT_SIZE.LARGE};
`;
