import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const sortButtonStyle = (theme: Theme) => css`
  padding: 5px 8px;
  font-size: ${theme.FONT_SIZE.EXTRA_SMALL};
  & > span {
    margin-right: 3px;
  }
`;

export const MenuItem = styled.li``;
