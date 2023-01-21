import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';

export const loginButtonStyle = (theme: Theme) => css`
  font-size: ${theme.FONT_SIZE.SMALL};
`;

export const nickNameButtonStyle = (theme: Theme) => css`
  z-index: 1;
  position: relative;
  font-size: ${theme.FONT_SIZE.SMALL};
`;

export const logoutButtonStyle = (theme: Theme) => css`
  color: ${theme.COLOR.SECOND_TEXT};
  font-size: ${theme.FONT_SIZE.EXTRA_SMALL};
`;

export const MenuItem = styled.li`
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
`;

export const Nickname = styled.span`
  margin-right: 7px;
`;
