import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';

export const nickNameButtonStyle = (theme: Theme) => css`
  font-size: ${theme.FONT_SIZE.SMALL};
`;

export const MenuItem = styled.li`
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  a:hover {
    color: ${({ theme }) => theme.COLOR.PRIMARY};
  }
`;

export const Nickname = styled.span`
  margin-right: 7px;
`;
