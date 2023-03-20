import { signOut } from 'next-auth/react';
import { css, Theme } from '@emotion/react';
import { ButtonVariant, ColorVariant } from '@/constants';
import { ModalKey } from '@/constants/keys';
import Button, { ButtonProps } from '@/components/atoms/Button';
import LoginModal from '@/components/organisms/LoginModal';

const loginButtonStyle = (theme: Theme) => css`
  font-size: ${theme.FONT_SIZE.SMALL};
  border-color: ${theme.COLOR.SECOND_TEXT};
`;

const logoutButtonStyle = (theme: Theme) => css`
  ${loginButtonStyle(theme)};
  color: ${theme.COLOR.SECOND_TEXT};
`;

const LoginButton = ({ ...buttonProps }: ButtonProps) => (
  <>
    <LoginModal.Button
      modalKey={ModalKey.LOGIN}
      variant={ButtonVariant.OUTLINED}
      color={ColorVariant.INHERIT}
      css={loginButtonStyle}
      {...buttonProps}
    >
      시작하기
    </LoginModal.Button>
    <LoginModal modalKey={ModalKey.LOGIN} />
  </>
);

const LogoutButton = ({ ...buttonProps }: ButtonProps) => (
  <Button css={logoutButtonStyle} {...buttonProps} onClick={() => signOut()}>
    로그아웃
  </Button>
);

interface AccountButtonProps extends ButtonProps {
  isLogin: boolean;
}

const AccountButton = ({ isLogin, ...buttonProps }: AccountButtonProps) =>
  isLogin ? (
    <LogoutButton {...buttonProps} />
  ) : (
    <LoginButton {...buttonProps} />
  );

export default AccountButton;
