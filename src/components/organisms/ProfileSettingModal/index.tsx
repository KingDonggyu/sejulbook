import Button, { ButtonProps } from '@/components/atoms/Button';
import TextField from '@/components/atoms/TextField';
import Modal, { ModalProps } from '@/components/molecules/Modal';
import { ButtonVariant, ColorVariant } from '@/constants';
import modalStore from '@/stores/modalStore';
import * as s from './style';

interface ProfileSettingModalProps {
  title: string;
  modalKey: string;
}

const ProfileSettingModal = ({
  title,
  modalKey,
  ...modalProps
}: ProfileSettingModalProps & Omit<ModalProps, 'children'>) => (
  <Modal
    modalKey={modalKey}
    elevation={4}
    isShowModalOverlay={false}
    css={s.modalStyle}
    {...modalProps}
  >
    <s.Title>{title}</s.Title>
    <TextField label="이름" />
    <TextField label="소개" />
    <Button
      color={ColorVariant.PRIMARY}
      variant={ButtonVariant.CONTAINED}
      css={s.buttonStyle}
    >
      완료
    </Button>
  </Modal>
);

const ProfileSettingButton = ({
  title,
  modalKey,
  children,
  ...buttinProps
}: ProfileSettingModalProps & ButtonProps) => {
  const { openModal } = modalStore();

  return (
    <>
      <Button onClick={() => openModal(modalKey)} {...buttinProps}>
        {children}
      </Button>
      <ProfileSettingModal title={title} modalKey={modalKey} />
    </>
  );
};

ProfileSettingModal.Button = ProfileSettingButton;

export default ProfileSettingModal;
