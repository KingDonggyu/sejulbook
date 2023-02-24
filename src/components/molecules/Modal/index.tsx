import { ReactNode } from 'react';
import { StyleProps } from '@/types/style';
import Box, { BoxProps } from '@/components/atoms/Box';
import Button from '@/components/atoms/Button';
import modalStore from '@/stores/modalStore';
import * as s from './style';

export type ModalProps = {
  modalKey: string;
  isShowCloseButton?: boolean;
  isShowModalOverlay?: boolean;
  handleCancel?: () => void;
  children: ReactNode;
} & BoxProps &
  StyleProps;

const Modal = ({
  modalKey,
  isShowCloseButton = true,
  isShowModalOverlay = true,
  handleCancel,
  children,
  ...boxProps
}: ModalProps) => {
  const { modalSet, closeModal } = modalStore();

  const handleClose = () => {
    if (handleCancel) {
      handleCancel();
    }
    closeModal(modalKey);
  };

  if (!modalSet.has(modalKey)) {
    return null;
  }

  return (
    <s.Background isShowOverlay={isShowModalOverlay}>
      {isShowModalOverlay && <s.ModalOverlay onClick={handleClose} />}
      <s.ModalWrapper isShowOverlay={isShowModalOverlay}>
        <Box radius={8} {...boxProps}>
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
