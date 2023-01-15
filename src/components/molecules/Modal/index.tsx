import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { MODAL_ELEMENT_ID } from '@/constants';
import * as s from './style';

type ModalProps = {
  children: ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById(MODAL_ELEMENT_ID));
  }, []);

  return portalElement
    ? createPortal(
        <s.Background>
          <s.ModalOverlay />
          <s.ModalWrapper>{children}</s.ModalWrapper>
        </s.Background>,
        portalElement,
      )
    : null;
};

export default Modal;
