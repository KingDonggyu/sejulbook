import styled from '@emotion/styled';

export const TabPanelWrapper = styled.div<{ count: number }>`
  display: grid;
  margin-bottom: 20px;
  grid-template-columns: ${({ count }) => `repeat(${count}, 1fr)`};
`;

export const TabPanel = styled.div<{
  isSelected: boolean;
  isShowOutline: boolean;
  isShowDivider: boolean;
  small: boolean;
}>`
  padding: ${({ small }) => (small ? '5px 0' : '15px 0')};

  & > button {
    width: 100%;
    margin: auto;
  }

  ${({ theme, isSelected, isShowOutline }) =>
    isShowOutline &&
    `  border: 1px solid ${
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
  ${({ theme, isSelected }) => isSelected && `color: ${theme.COLOR.PRIMARY}`};

  font-size: ${({ theme, small }) =>
    small ? theme.FONT_SIZE.SMALL : theme.FONT_SIZE.MEDIUM};
`;
