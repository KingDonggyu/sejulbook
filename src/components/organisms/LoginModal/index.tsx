import { signIn } from 'next-auth/react';
import Image from 'next/image';
import kakaoButtonSrc from '@public/images/btn-kakao.svg';
import naverButtonSrc from '@public/images/btn-naver.svg';
import { APP_NAME, OAuthName } from '@/constants';
import Button, { ButtonProps } from '@/components/atoms/Button';
import Modal, { ModalProps } from '@/components/molecules/Modal';
import modalStore from '@/stores/modalStore';
import * as s from './style';

type LoginModalProps = { modalKey: string };

const LoginModal = ({
  modalKey,
}: LoginModalProps & Omit<ModalProps, 'children'>) => {
  const handleLogin = async (oAuthName: OAuthName) => {
    await signIn(oAuthName);
  };

  return (
    <Modal modalKey={modalKey} css={s.modalStyle}>
      <s.Title>{APP_NAME} 시작하기</s.Title>
      <s.EasyLoginText>SNS 계정으로 간편 로그인</s.EasyLoginText>
      <s.LoginButtonWrapper>
        <Button elevation={4} onClick={() => handleLogin(OAuthName.KAKAO)}>
          <Image priority src={kakaoButtonSrc} alt="카카오 로그인 버튼" />
        </Button>
        <Button elevation={4} onClick={() => handleLogin(OAuthName.NAVER)}>
          <Image priority src={naverButtonSrc} alt="네이버 로그인 버튼" />
        </Button>
      </s.LoginButtonWrapper>
    </Modal>
  );
};

const LoginButton = ({
  modalKey,
  children,
  ...buttonProps
}: LoginModalProps & ButtonProps) => {
  const { openModal } = modalStore();

  return (
    <>
      <Button onClick={() => openModal(modalKey)} {...buttonProps}>
        {children}
      </Button>
      <LoginModal modalKey={modalKey} />
    </>
  );
};

LoginModal.Button = LoginButton;

export default LoginModal;
