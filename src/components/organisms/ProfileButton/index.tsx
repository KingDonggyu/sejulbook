import { useSession, signOut } from 'next-auth/react';
import { css } from '@emotion/react';
import { ButtonVariant } from '@/constants';
import { ModalKey } from '@/constants/keys';
import Button from '@/components/atoms/Button';
import modalStore from '@/stores/modalStore';

const ProfileButton = () => {
  const { openModal } = modalStore();
  const { status } = useSession();

  const handleClick = () => {
    if (status !== 'authenticated') {
      openModal(ModalKey.LOGIN);
      return;
    }
    signOut();
  };

  return (
    <Button
      variant={ButtonVariant.OUTLINED}
      onClick={handleClick}
      css={(theme) => css`
        font-size: ${theme.FONT_SIZE.SMALL};
      `}
    >
      {status !== 'authenticated' ? '로그인' : '로그아웃'}
    </Button>
  );
};

export default ProfileButton;
