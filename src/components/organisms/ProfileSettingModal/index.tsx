import { FormEvent, useRef } from 'react';
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
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formRef.current) {
      return;
    }

    const values: string[] = [];

    Array.from(formRef.current.elements).forEach((element) => {
      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement
      ) {
        values.push(element.value);
      }
    });

    onComplete({ name: values[0], introduce: values[1] });
  };

  return (
    <Modal modalKey={modalKey} {...modalProps}>
      <s.Form ref={formRef} onSubmit={handleSubmit}>
        <s.Title>{title}</s.Title>
        <TextField label="이름" defaultValue={initName} />
        <TextArea label="소개" defaultValue={initIntroduce} />
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
