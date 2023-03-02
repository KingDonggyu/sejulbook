import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MENU_Z_INDEX } from '@/constants/zIndex';

interface MenuStyleProps {
  top: number;
  bottom?: number;
  right?: number;
  left?: number;
  full: boolean;
}

export const Background = styled.div`
  z-index: ${MENU_Z_INDEX};
  position: relative;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Wrapper = styled.div<MenuStyleProps>`
  width: ${({ full }) => (full ? '100%' : 'max-content')};
  position: absolute;
  top: ${({ top }) => `${top}px`};
  ${({ bottom }) => bottom !== undefined && `bottom: ${bottom}px`}
  ${({ right }) => right !== undefined && `right: ${right}px`}
  ${({ left }) => left !== undefined && `left: ${left}px`}
  ${({ full }) => full && `& > div { width: 100% !important; }`};
`;

export const MenuList = styled.ul<{ divider: boolean }>`
  padding: 8px 10px;

  & > * {
    padding: ${({ divider }) => (divider ? '12px' : '10px 15px')};
    font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};

    ${({ divider, theme }) =>
      divider && `border-bottom: 1px solid ${theme.COLOR.LINE}`}
  }

  & > *:last-child {
    border: none;
  }

  & button {
    width: 100%;
    justify-content: flex-start;
  }

  & a {
    display: block;
    width: 100%;
  }
`;

export const boxStyle = css`
  width: fit-content;
  padding: 0;
`;
