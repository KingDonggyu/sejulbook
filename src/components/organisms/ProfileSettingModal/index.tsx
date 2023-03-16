import { useState } from 'react';
import Button from '@/components/atoms/Button';
import TextField from '@/components/atoms/TextField';
import TextArea from '@/components/atoms/TextArea';
import Modal, { ModalProps } from '@/components/molecules/Modal';
import { ButtonVariant, ColorVariant } from '@/constants';
import { User, UserName, Introduce } from '@/types/features/user';
import * as s from './style';

interface ProfileSettingModalProps {
  title: string;
  initName?: string;
  initIntroduce?: string;
  modalKey: string;
  onComplete: ({ name, introduce }: Pick<User, 'name' | 'introduce'>) => void;
}

const ProfileSettingModal = ({
  title,
  modalKey,
  onComplete,
  initName = '',
  initIntroduce = '',
  ...modalProps
}: ProfileSettingModalProps & Omit<ModalProps, 'children'>) => {
  const [name, setName] = useState<UserName>(initName);
  const [introduce, setIntroduce] = useState<Introduce>(initIntroduce);

  const handleClose = () => {
    setName(initName);
    setIntroduce(initIntroduce);
  };

  return (
    <Modal
      modalKey={modalKey}
      onCancel={handleClose}
      css={s.modalStyle}
      {...modalProps}
    >
      <s.Title>{title}</s.Title>
      <TextField
        label="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextArea
        label="소개"
        value={introduce}
        onChange={(e) => setIntroduce(e.target.value)}
      />
      <Button
        color={ColorVariant.PRIMARY}
        variant={ButtonVariant.CONTAINED}
        css={s.buttonStyle}
        onClick={() => onComplete({ name, introduce })}
      >
        완료
      </Button>
    </Modal>
  );
};

export default ProfileSettingModal;
