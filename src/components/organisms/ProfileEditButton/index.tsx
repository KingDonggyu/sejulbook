import { css, Theme } from '@emotion/react';
import { ButtonVariant, ColorVariant } from '@/constants';
import Button from '@/components/atoms/Button';
import ProfileSettingModal from '@/components/organisms/ProfileSettingModal';
import { ModalKey } from '@/constants/keys';
import modalStore from '@/stores/modalStore';
import { User } from '@/types/features/user';
import useUserEdit from '@/hooks/services/mutations/useUserEdit';
import useMe from '@/hooks/services/queries/useMe';

const editProfileButtonStyle = (theme: Theme) => css`
  padding: 5px 8px;
  font-size: ${theme.FONT_SIZE.EXTRA_SMALL};
`;

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
        css={editProfileButtonStyle}
        onClick={() => openModal(ModalKey.PROFILE_SETTING)}
      >
        프로필 편집
      </Button>
      <ProfileSettingModal
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
