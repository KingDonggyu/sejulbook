import { ReactNode } from 'react';
import { StyleProps } from '@/types/style';
import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button';
import modalStore from '@/stores/modalStore';
import * as s from './style';

type ModalProps = {
  modalKey: string;
  isShowCloseButton?: boolean;
  isShowModalOverlay?: boolean;
  children: ReactNode;
} & StyleProps;

const Modal = ({
  modalKey,
  isShowCloseButton = true,
  isShowModalOverlay = true,
  children,
  ...boxStyles
}: ModalProps) => {
  const { modalSet, closeModal } = modalStore();

  const handleClose = () => {
    closeModal(modalKey);
  };

  if (!modalSet.has(modalKey)) {
    return null;
  }

  return (
    <s.Background>
      {isShowModalOverlay && <s.ModalOverlay onClick={handleClose} />}
      <s.ModalWrapper>
        <Box radius={8} {...boxStyles}>
          {isShowCloseButton && (
            <Button.Cancel
              size={20}
              css={s.cancelButtonStyle}
              onClick={handleClose}
            />
          )}
          {children}
        </Box>
      </s.ModalWrapper>
    </s.Background>
  );
};

export default Modal;
