import styled from '@emotion/styled';
import { Alignment, TextFieldVariant } from '@/constants';

interface TextAreaStyleProps {
  color: string;
  variant: TextFieldVariant;
}

export const Wrapper = styled.div<{ alignment: Alignment }>`
  width: 100%;
  gap: 10px;
  display: flex;
  align-items: center;
  ${({ alignment }) =>
    alignment === Alignment.COLUMN &&
    `
  flex-direction: column;
  align-items: flex-start;
`};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
`;

export const TextArea = styled.textarea<TextAreaStyleProps>`
  line-height: 1.6;
  width: 100%;
  outline: none;
  border: none;
  resize: none;
  overflow: hidden;
  background: inherit;
  color: ${({ theme }) => theme.COLOR.TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};

  ${({ theme, variant }) =>
    variant === TextFieldVariant.OUTLINED &&
    `
      padding: 10px;
      background: ${theme.COLOR.BOX};
      border: 1px solid ${theme.COLOR.LINE};
  `};

  ${({ theme, variant }) =>
    variant === TextFieldVariant.BOTTOM_LINED &&
    `
      padding: 10px 0;
      border-bottom: 1px solid ${theme.COLOR.SECOND_TEXT};
  `};

  &:focus-within {
    border-color: ${({ color }) => color};
  }
`;
