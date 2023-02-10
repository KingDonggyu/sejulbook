import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 25px;
  height: 100%;
  padding: 10px;
  padding-bottom: 30px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 15px;
  font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
`;

export const ExplainText = styled.div`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
`;

export const buttonStyle = css`
  width: 100%;
  margin-top: auto;
`;
