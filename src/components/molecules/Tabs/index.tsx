import { ReactNode, useState } from 'react';
import type { StyleProps } from '@emotion/react';
import Button from '@/components/atoms/Button';
import * as s from './style';

interface TabPanelProps {
  title: string;
  isSelected?: boolean;
  small: boolean;
  isShowBottomLine: boolean;
  isShowDivider: boolean;
  onClick: () => void;
}

const TabPanel = ({
  title,
  isSelected = false,
  small,
  isShowBottomLine,
  isShowDivider,
  onClick,
}: TabPanelProps) => (
  <s.TabPanel
    isSelected={isSelected}
    isShowOutline={isShowBottomLine}
    isShowDivider={isShowDivider}
    small={small}
  >
    <Button onClick={onClick}>
      <s.TabPanelTitle isSelected={isSelected} small={small}>
        {title}
      </s.TabPanelTitle>
    </Button>
  </s.TabPanel>
);

interface TabsProps extends StyleProps {
  tabItems: { title: string; onClick: (index: number) => void }[];
  small?: boolean;
  isShowOutline?: boolean;
  isShowDivider?: boolean;
  children: ReactNode;
}

const Tabs = ({
  tabItems,
  children,
  small = false,
  isShowOutline = true,
  isShowDivider = false,
  ...styleProps
}: TabsProps) => {
  const [selectionStateList, setSelectionStateList] = useState([true, false]);

  const handleClickTabPanel = (index: number) => {
    const nextSelectionStateList = Array(selectionStateList.length).fill(false);
    nextSelectionStateList[index] = true;

    setSelectionStateList(nextSelectionStateList);
    tabItems[index].onClick(index);
  };

  return (
    <div>
      <s.TabPanelWrapper count={tabItems.length} {...styleProps}>
        {tabItems.map(({ title }, index) => (
          <TabPanel
            key={title}
            title={title}
            small={small}
            isShowBottomLine={isShowOutline}
            isShowDivider={isShowDivider}
            isSelected={selectionStateList[index]}
            onClick={() => handleClickTabPanel(index)}
          />
        ))}
      </s.TabPanelWrapper>
      {children}
    </div>
  );
};

export default Tabs;
