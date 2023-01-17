import { ButtonVariant } from '@/constants';
import { ModalKey } from '@/constants/keys';
import Button from '@/components/atoms/Button';
import modalStore from '@/stores/modalStore';

const ProfileButton = () => {
  const { openModal } = modalStore();

  return (
    <Button
      variant={ButtonVariant.OUTLINED}
      onClick={() => openModal(ModalKey.LOGIN)}
      style={{ height: '30px' }}
    >
      시작하기
    </Button>
  );
};

export default ProfileButton;
