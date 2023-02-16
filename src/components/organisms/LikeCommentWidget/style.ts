import { css, Theme } from '@emotion/react';
import { iconButtonStyle } from '@/styles/common';
import styled from '@emotion/styled';

const RESPONSIVE_WIDTH = '1080px';

export const boxStyle = (theme: Theme) => css`
  width: fit-content;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  @media screen and (max-width: ${RESPONSIVE_WIDTH}) {
    flex-direction: row;
    padding: 8px 12px;
    left: 30px;
    top: 5rem;
  }

  @media screen and (max-width: ${theme.MAX_WIDTH.TABLET}) {
    left: 10px;
  }
`;

export const buttonStyle = css`
  ${iconButtonStyle};
`;

export const Wrapper = styled.div`
  position: relative;
`;

export const Widget = styled.div`
  position: absolute;
  left: -10rem;
`;

export const WidgetItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  svg {
    width: 20px;
    height: 20px;
  }
  @media screen and (max-width: ${RESPONSIVE_WIDTH}) {
    flex-direction: row;
    align-items: flex-start;
    svg {
      width: 15px;
      height: 15px;
    }
  }
`;

export const Count = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
  font-family: ${({ theme }) => theme.FONT_FAMILY.notoSansKR};
  @media screen and (max-width: ${RESPONSIVE_WIDTH}) {
    font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_SMALL};
  }
`;
