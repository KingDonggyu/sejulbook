import { useState } from 'react';
import Button from '@/components/atoms/Button';
import TextField from '@/components/atoms/TextField';
import Modal, { ModalProps } from '@/components/molecules/Modal';
import { ButtonVariant, ColorVariant } from '@/constants';
import { UserName, Introduce } from '@/types/features/user';
import * as s from './style';

interface ProfileSettingModalProps {
  title: string;
  modalKey: string;
  handleComplete: ({
    name,
    introduce,
  }: {
    name: UserName;
    introduce: Introduce;
  }) => void;
}

const ProfileSettingModal = ({
  title,
  modalKey,
  handleComplete,
  ...modalProps
}: ProfileSettingModalProps & Omit<ModalProps, 'children'>) => {
  const [name, setName] = useState<UserName>('');
  const [introduce, setIntroduce] = useState<Introduce>('');

  const handleClick = () => {
    handleComplete({ name, introduce });
  };

  return (
    <Modal
      modalKey={modalKey}
      elevation={4}
      isShowModalOverlay={false}
      css={s.modalStyle}
      {...modalProps}
    >
      <s.Title>{title}</s.Title>
      <TextField
        label="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="소개"
        value={introduce}
        onChange={(e) => setIntroduce(e.target.value)}
      />
      <Button
        color={ColorVariant.PRIMARY}
        variant={ButtonVariant.CONTAINED}
        css={s.buttonStyle}
        onClick={handleClick}
      >
        완료
      </Button>
    </Modal>
  );
};

export default ProfileSettingModal;
