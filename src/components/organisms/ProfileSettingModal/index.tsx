import { FormEvent } from 'react';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import TextField from '@/components/atoms/TextField';
import TextArea from '@/components/atoms/TextArea';
import Modal, { ModalProps } from '@/components/molecules/Modal';
import { ButtonVariant, ColorVariant } from '@/constants';
import Route from '@/constants/routes';
import type { Profile } from 'user';
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
  let name = initName;
  let introduce = initIntroduce;

  const handleClose = () => {
    name = '';
    introduce = '';
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onComplete({ name, introduce });
  };

  return (
    <Modal modalKey={modalKey} onCancel={handleClose} {...modalProps}>
      <s.Form onSubmit={handleSubmit}>
        <s.Title>{title}</s.Title>
        <TextField
          label="이름"
          defaultValue={initName}
          onChange={(e) => {
            name = e.target.value;
          }}
        />
        <TextArea
          label="소개"
          defaultValue={initIntroduce}
          onChange={(e) => {
            introduce = e.target.validationMessage;
          }}
        />
        <Button
          type="submit"
          color={ColorVariant.PRIMARY}
          variant={ButtonVariant.CONTAINED}
          css={s.buttonStyle}
        >
          완료
        </Button>
        {isLogged && (
          <Link href={{ pathname: `${Route.LIBRARY}/delete` }}>탈퇴하기</Link>
        )}
      </s.Form>
    </Modal>
  );
};

export default ProfileSettingModal;
