import { ReactNode, useState } from 'react';
import Button from '@/components/atoms/Button';
import { StyleProps } from '@/types/style';
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
    isShowBottomLine={isShowBottomLine}
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
  isShowBottomLine?: boolean;
  isShowDivider?: boolean;
  children: ReactNode;
}

const Tabs = ({
  tabItems,
  children,
  small = false,
  isShowBottomLine = true,
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
    <div {...styleProps}>
      <s.TabPanelWrapper count={tabItems.length}>
        {tabItems.map(({ title }, index) => (
          <TabPanel
            title={title}
            small={small}
            isShowBottomLine={isShowBottomLine}
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
