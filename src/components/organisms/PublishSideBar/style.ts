import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 200px;
  height: 100%;
  padding: 20px 10px;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
`;

export const buttonStyle = css`
  width: 100%;
  margin-top: auto;
`;
