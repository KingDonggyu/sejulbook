import styled from '@emotion/styled';

export const TabPanelWrapper = styled.div<{ count: number }>`
  display: grid;
  grid-template-columns: ${({ count }) => `repeat(${count}, 1fr)`};
  padding-bottom: 20px;
`;

export const TabPanel = styled.div<{
  isSelected: boolean;
  isShowBottomLine: boolean;
  isShowDivider: boolean;
  small: boolean;
}>`
  padding: ${({ small }) => (small ? '10px 0' : '20px 0')};

  & > button {
    width: 100%;
    margin: auto;
  }

  ${({ theme, isSelected, isShowBottomLine }) =>
    isShowBottomLine &&
    `  border-bottom: 2px solid ${
      isSelected ? theme.COLOR.PRIMARY : theme.COLOR.LINE
    }`};

  ${({ theme, isShowDivider }) =>
    isShowDivider &&
    ` &:not(&:last-of-type) {
      border-right: 1px solid ${theme.COLOR.LINE};
    }`};
`;

export const TabPanelTitle = styled.div<{
  isSelected: boolean;
  small: boolean;
}>`
  font-size: ${({ theme, small }) =>
    small ? theme.FONT_SIZE.SMALL : theme.FONT_SIZE.MEDIUM};
  ${({ theme, isSelected }) => isSelected && `color: ${theme.COLOR.PRIMARY}`};
`;
