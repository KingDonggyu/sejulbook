import { signOut } from 'next-auth/react';
import { css, Theme } from '@emotion/react';
import { ButtonVariant, ColorVariant } from '@/constants';
import { ModalKey } from '@/constants/keys';
import modalStore from '@/stores/modalStore';
import Button from '@/components/atoms/Button';
import LoginModal from '@/components/organisms/LoginModal';

const loginButtonStyle = (theme: Theme) => css`
  font-size: ${theme.FONT_SIZE.SMALL};
`;

const logoutButtonStyle = (theme: Theme) => css`
  ${loginButtonStyle(theme)};
  color: ${theme.COLOR.SECOND_TEXT};
`;

const LoginButton = () => {
  const { openModal } = modalStore();
  return (
    <>
      <Button
        variant={ButtonVariant.OUTLINED}
        color={ColorVariant.INHERIT}
        css={loginButtonStyle}
        onClick={() => openModal(ModalKey.LOGIN)}
      >
        시작하기
      </Button>
      <LoginModal modalKey={ModalKey.LOGIN} />
    </>
  );
};

const LogoutButton = () => (
  <Button css={logoutButtonStyle} onClick={() => signOut()}>
    로그아웃
  </Button>
);

const AccountButton = () => {};

AccountButton.Login = LoginButton;
AccountButton.Logout = LogoutButton;

export default AccountButton;
