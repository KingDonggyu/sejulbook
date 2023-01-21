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

export const MenuList = styled.ul<{ divider: boolean }>`
  padding: 8px 10px;

  & > * {
    padding: ${({ divider }) => (divider ? '15px' : '10px 15px')};
    font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};

    ${({ divider, theme }) =>
      divider && `border-bottom: 1px solid ${theme.COLOR.LINE}`}
  }

  & > *:last-child {
    border: none;
  }
`;
