import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { OAuthName } from '@/constants';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import googleButtonSrc from '@public/images/btn-google.svg';
import kakaoButtonSrc from '@public/images/btn-kakao.svg';
import naverButtonSrc from '@public/images/btn-naver.svg';
import * as s from './style';

const LoginModal = ({ modalKey }: { modalKey: string }) => {
  const handleLogin = (oAuthName: OAuthName) => {
    signIn(oAuthName);
  };

  return (
    <Modal modalKey={modalKey} css={s.modalStyle}>
      <s.Title>
        <span>세</span> 줄 독후감 시작하기
      </s.Title>
      <s.EasyLoginDivider />
      <s.EasyLoginText>간편 로그인</s.EasyLoginText>
      <s.LoginButtonWrapper>
        <Button elevation={4} onClick={() => handleLogin(OAuthName.GOOGLE)}>
          <Image src={googleButtonSrc} alt="구글 로그인 버튼" />
        </Button>
        <Button elevation={4} onClick={() => handleLogin(OAuthName.KAKAO)}>
          <Image src={kakaoButtonSrc} alt="카카오 로그인 버튼" />
        </Button>
        <Button elevation={4} onClick={() => handleLogin(OAuthName.NAVER)}>
          <Image src={naverButtonSrc} alt="네이버 로그인 버튼" />
        </Button>
      </s.LoginButtonWrapper>
    </Modal>
  );
};

export default LoginModal;
