import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Wrapper = styled.main`
  max-width: ${({ theme }) => theme.MAX_WIDTH.POST};
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rem 20px;
  gap: 40px;

  button {
    font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};
    width: 15rem;
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.FONT_SIZE.DISPLAY};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
`;

export const Description = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};

  strong {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
  }
`;

export const WarningText = styled.div`
  line-height: 1.5;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
`;

export const CheckBox = styled.div`
  width: 2rem;
  height: 2rem;
  color: ${({ theme }) => theme.COLOR.TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.LARGE};
`;

export const checkButtonStyle = css`
  padding: 0;
  width: fit-content !important;
`;
