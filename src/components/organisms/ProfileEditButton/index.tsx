import type { Profile } from 'user';
import Button from '@/components/atoms/Button';
import ProfileSettingModal from '@/components/organisms/ProfileSettingModal';
import { ButtonVariant, ColorVariant } from '@/constants';
import { ModalKey } from '@/constants/keys';
import modalStore from '@/stores/modalStore';
import useUserEdit from '@/hooks/services/mutations/useUserEdit';
import useMe from '@/hooks/useMe';

const ProfileEditButton = () => {
  const { user } = useMe();
  const { openModal, closeModal } = modalStore();

  const updateUser = useUserEdit({
    onSuccess: () => closeModal(ModalKey.PROFILE_SETTING),
  });

  if (!user) {
    return null;
  }

  const handleComplete = ({ name, introduce }: Profile) => {
    if (user.name === name && user.introduce === introduce) {
      closeModal(ModalKey.PROFILE_SETTING);
      return;
    }
    updateUser({ name, introduce });
  };

  return (
    <>
      <Button
        variant={ButtonVariant.OUTLINED}
        color={ColorVariant.PRIMARY}
        onClick={() => openModal(ModalKey.PROFILE_SETTING)}
      >
        프로필 편집
      </Button>
      <ProfileSettingModal
        isLogged
        modalKey={ModalKey.PROFILE_SETTING}
        onComplete={handleComplete}
        initName={user.name}
        initIntroduce={user.introduce}
        title="프로필 편집"
      />
    </>
  );
};

export default ProfileEditButton;
