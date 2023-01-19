import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { MODAL_ELEMENT_ID } from '@/constants';
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
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  const handleClose = () => {
    closeModal(modalKey);
  };

  useEffect(() => {
    setPortalElement(document.getElementById(MODAL_ELEMENT_ID));
  }, []);

  return portalElement && modalSet.has(modalKey)
    ? createPortal(
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
        </s.Background>,
        portalElement,
      )
    : null;
};

export default Modal;
