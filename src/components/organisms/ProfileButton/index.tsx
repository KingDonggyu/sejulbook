import { MouseEvent } from 'react';
import { css } from '@emotion/react';
import { ButtonVariant } from '@/constants';
import { ModalKey } from '@/constants/keys';
import modalStore from '@/stores/modalStore';
import useLoginStatus from '@/hooks/useLoginStatus';
import useDropdownMenu from '@/hooks/useDropdownMenu';
import Button from '@/components/atoms/Button';
import Menu, { MenuItem } from '@/components/molecules/Menu';

const ProfileButton = () => {
  const { openModal } = modalStore();
  const { session, isLogin } = useLoginStatus();
  const { anchorEl, handleMenuToggle, handleMenuClose } = useDropdownMenu();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (isLogin) {
      handleMenuToggle(e);
      return;
    }
    openModal(ModalKey.LOGIN);
  };

  return isLogin ? (
    <div>
      <Button
        onClick={handleClick}
        css={(theme) => css`
          z-index: 1;
          font-size: ${theme.FONT_SIZE.SMALL};
        `}
      >
        {session?.user?.name}
      </Button>
      <Menu
        anchorEl={anchorEl}
        top={13}
        right={1}
        handleClose={handleMenuClose}
      >
        <MenuItem>내 서재</MenuItem>
        <MenuItem>로그아웃</MenuItem>
      </Menu>
    </div>
  ) : (
    <Button
      variant={ButtonVariant.OUTLINED}
      onClick={handleClick}
      css={(theme) => css`
        font-size: ${theme.FONT_SIZE.SMALL};
      `}
    >
      로그인
    </Button>
  );
};

export default ProfileButton;
