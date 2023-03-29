import { useState } from 'react';
import { TiArrowSortedDown } from '@react-icons/all-files/ti/TiArrowSortedDown';
import { ButtonVariant, BoxVariant } from '@/constants';
import Button, { ButtonProps } from '@/components/atoms/Button';
import Menu from '@/components/molecules/Menu';
import useOpenClose from '@/hooks/useOpenClose';
import * as s from './style';

interface SortDropdownProps extends ButtonProps {
  onClickLatestButton: () => void;
  onClickLikeSortButton: () => void;
}

const SortDropdown = ({
  onClickLatestButton,
  onClickLikeSortButton,
  ...buttonProps
}: SortDropdownProps) => {
  const { anchorEl, handleToggle, handleClose } = useOpenClose();
  const [isLatestSorted, setIsLatestSorted] = useState(true);

  const handleClickLatestButton = () => {
    onClickLatestButton();
    setIsLatestSorted(true);
    handleClose();
  };

  const handleClickLikeSortButton = () => {
    onClickLikeSortButton();
    setIsLatestSorted(false);
    handleClose();
  };

  return (
    <div>
      <Button
        variant={ButtonVariant.OUTLINED}
        css={s.sortButtonStyle}
        onClick={handleToggle}
        {...buttonProps}
      >
        <span>{isLatestSorted ? '최신순' : '좋아요 순'}</span>
        <TiArrowSortedDown />
      </Button>
      <Menu
        top={5}
        right={0}
        anchorEl={anchorEl}
        variant={BoxVariant.OUTLINED}
        handleClose={handleClose}
      >
        <s.MenuItem>
          <Button onClick={handleClickLatestButton}>최신순</Button>
        </s.MenuItem>
        <s.MenuItem>
          <Button onClick={handleClickLikeSortButton}>좋아요 순</Button>
        </s.MenuItem>
      </Menu>
    </div>
  );
};

export default SortDropdown;
