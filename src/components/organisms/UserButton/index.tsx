import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown';
import { IoIosArrowUp } from '@react-icons/all-files/io/IoIosArrowUp';
import { ButtonVariant, BoxVariant, ColorVariant } from '@/constants';
import { ModalKey } from '@/constants/keys';
import Route from '@/constants/routes';
import modalStore from '@/stores/modalStore';
import useLoginStatus from '@/hooks/useLoginStatus';
import useDropdownMenu from '@/hooks/useDropdownMenu';
import Button from '@/components/atoms/Button';
import Menu from '@/components/molecules/Menu';
import LoginModal from '@/components/organisms/LoginModal';
import * as s from './style';

const LoginButton = () => {
  const { openModal } = modalStore();
  return (
    <>
      <Button
        variant={ButtonVariant.OUTLINED}
        color={ColorVariant.SECONDARY}
        css={s.loginButtonStyle}
        onClick={() => openModal(ModalKey.LOGIN)}
      >
        로그인
      </Button>
      <LoginModal modalKey={ModalKey.LOGIN} />
    </>
  );
};

const LogoutButton = () => (
  <Button css={s.logoutButtonStyle} onClick={() => signOut()}>
    로그아웃
  </Button>
);

const MyLibraryButton = ({ handleClick }: { handleClick?: () => void }) => (
  <Link href={`${Route.LIBRARY}/1`} onClick={handleClick}>
    내 서재
  </Link>
);

const UserInfoDropdownButton = () => {
  const { session } = useLoginStatus();
  const { anchorEl, handleMenuToggle, handleMenuClose } = useDropdownMenu();
  const isShowMenu = Boolean(anchorEl);

  return (
    <div>
      <Button onClick={(e) => handleMenuToggle(e)} css={s.nickNameButtonStyle}>
        <s.Nickname>{session?.user?.name}</s.Nickname>
        {isShowMenu ? <IoIosArrowUp size={17} /> : <IoIosArrowDown size={17} />}
      </Button>
      <Menu
        top={13}
        right={1}
        divider={false}
        variant={BoxVariant.OUTLINED}
        anchorEl={anchorEl}
        handleClose={handleMenuClose}
      >
        <s.MenuItem>
          <MyLibraryButton handleClick={handleMenuClose} />
        </s.MenuItem>
        <s.MenuItem>
          <LogoutButton />
        </s.MenuItem>
      </Menu>
    </div>
  );
};

const UserButton = () => {
  const { isLogin } = useLoginStatus();
  return isLogin ? <UserInfoDropdownButton /> : <LoginButton />;
};

export default UserButton;
