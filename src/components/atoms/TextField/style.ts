import styled from '@emotion/styled';
import { TextFieldVariant, Alignment } from '@/constants';

interface TextFieldStyleProps {
  hasIcon: boolean;
  color: string;
  variant: TextFieldVariant;
}

export const Wrapper = styled.div<{ alignment: Alignment }>`
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

export const TextFieldBorder = styled.div<TextFieldStyleProps>`
  ${({ theme, variant }) =>
    variant === TextFieldVariant.OUTLINED &&
    `
    & > input {
      padding: 10px;
      border-radius: 5px;
    }
    border-radius: 5px;
    background: ${theme.COLOR.BOX};
    border: 1px solid ${theme.COLOR.SECOND_TEXT};
  `};

  ${({ theme, variant }) =>
    variant === TextFieldVariant.BOTTOM_LINED &&
    `
    & > input {
      padding: 7px 0;
    }
    border-bottom: 1px solid ${theme.COLOR.SECOND_TEXT};
  `};

  ${({ hasIcon }) =>
    hasIcon &&
    `
    display: flex;
    align-items: center;
    padding-left: 8px;
    & > input {
      padding-left: 5px;
    }
  `}

  &:focus-within {
    border-color: ${({ color }) => color};
  }
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
`;

export const TextField = styled.input`
  outline: none;
  border: none;
  background: inherit;
  width: 100%;
  color: ${({ theme }) => theme.COLOR.TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
`;
