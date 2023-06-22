import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import TextField from '@/components/atoms/TextField';
import TextArea from '@/components/atoms/TextArea';
import Modal, { ModalProps } from '@/components/molecules/Modal';
import { ButtonVariant, ColorVariant } from '@/constants';
import Route from '@/constants/routes';
import type { Profile } from '@/types/domain/user';
import * as s from './style';

interface ProfileSettingModalProps {
  isLogged?: boolean;
  title: string;
  initName?: string;
  initIntroduce?: string;
  modalKey: string;
  onComplete: ({ name, introduce }: Profile) => void;
}

const ProfileSettingModal = ({
  title,
  modalKey,
  onComplete,
  initName = '',
  initIntroduce = '',
  isLogged = false,
  ...modalProps
}: ProfileSettingModalProps & Omit<ModalProps, 'children'>) => {
  const [name, setName] = useState(initName);
  const [introduce, setIntroduce] = useState(initIntroduce);

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
      {isLogged && (
        <Link href={{ pathname: `${Route.LIBRARY}/delete` }}>탈퇴하기</Link>
      )}
    </Modal>
  );
};

export default ProfileSettingModal;
