import { TiArrowSortedDown } from '@react-icons/all-files/ti/TiArrowSortedDown';
import { ButtonVariant, BoxVariant } from '@/constants';
import Button from '@/components/atoms/Button';
import Menu from '@/components/molecules/Menu';
import useOpenClose from '@/hooks/useOpenClose';
import * as s from './style';

const BookReivewSort = () => {
  const { anchorEl, handleToggle, handleClose } = useOpenClose();

  return (
    <div>
      <Button
        variant={ButtonVariant.OUTLINED}
        css={s.sortButtonStyle}
        onClick={handleToggle}
      >
        <span>최신순</span>
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
          <Button>최신순</Button>
        </s.MenuItem>
        <s.MenuItem>
          <Button>좋아요 순</Button>
        </s.MenuItem>
      </Menu>
    </div>
  );
};

export default BookReivewSort;
