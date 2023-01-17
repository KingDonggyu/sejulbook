import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiX } from '@react-icons/all-files/hi/HiX';
import { MODAL_ELEMENT_ID } from '@/constants';
import { StyleProps } from '@/types/style';
import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button';
import * as s from './style';

type ModalProps = {
  isShowCloseButton?: boolean;
  closeModal: () => void;
  children: ReactNode;
} & StyleProps;

const Modal = ({
  isShowCloseButton = true,
  closeModal,
  children,
  ...boxStyles
}: ModalProps) => {
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById(MODAL_ELEMENT_ID));
  }, []);

  return portalElement
    ? createPortal(
        <s.Background>
          <s.ModalOverlay onClick={closeModal} />
          <s.ModalWrapper>
            <Box {...boxStyles}>
              {isShowCloseButton && (
                <Button
                  style={{ marginLeft: 'auto', marginBottom: '12px' }}
                  onClick={closeModal}
                >
                  <HiX size={20} />
                </Button>
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
