import Button from '@/components/atoms/Button';
import ProfileSettingModal from '@/components/organisms/ProfileSettingModal';
import { ButtonVariant, ColorVariant } from '@/constants';
import { ModalKey } from '@/constants/keys';
import modalStore from '@/stores/modalStore';
import { User } from '@/types/features/user';
import useUserEdit from '@/hooks/services/mutations/useUserEdit';
import useMe from '@/hooks/services/queries/useMe';

const ProfileEditButton = () => {
  const me = useMe();
  const { openModal, closeModal } = modalStore();

  const updateUser = useUserEdit({
    onSuccess: () => closeModal(ModalKey.PROFILE_SETTING),
  });

  const handleComplete = ({
    name,
    introduce,
  }: Pick<User, 'name' | 'introduce'>) => {
    if (!me || (me.name === name && me.introduce === introduce)) {
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
        initName={me?.name}
        initIntroduce={me?.introduce}
        title="프로필 편집"
      />
    </>
  );
};

export default ProfileEditButton;
