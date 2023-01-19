import { useSession, signOut } from 'next-auth/react';
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
      style={{ height: '30px' }}
    >
      {status !== 'authenticated' ? '시작하기' : '로그아웃'}
    </Button>
  );
};

export default ProfileButton;
