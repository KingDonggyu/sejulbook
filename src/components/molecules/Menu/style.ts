import styled from '@emotion/styled';

interface MenuStyleProps {
  top: number;
  bottom?: number;
  right?: number;
  left?: number;
}

export const Background = styled.div`
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
  width: max-content;
  position: absolute;
  top: ${({ top }) => `${top}px`};
  ${({ bottom }) => bottom && `bottom: ${bottom}px`}
  ${({ right }) => right && `right: ${right}px`}
  ${({ left }) => left && `left: ${left}px`}
`;

export const MenuList = styled.ul`
  padding: 8px 10px;
  & > li:last-child {
    border: none;
  }
`;

export const MenuItem = styled.li<{ divider: boolean }>`
  padding: 15px;
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};

  & * {
    font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  }

  ${({ divider, theme }) =>
    divider && `border-bottom: 1px solid ${theme.COLOR.LINE}`}
`;
