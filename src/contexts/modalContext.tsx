import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { StyleProps } from '@/types/style';
import Modal from '@/components/molecules/Modal';

interface ModalContextProps {
  isShowModal: boolean;
  openModal: () => void;
  closeModal: () => void;
}

type ModalProviderProps = {
  children: ReactNode;
} & StyleProps;

const ModalContext = createContext<ModalContextProps>({
  isShowModal: false,
  openModal: () => {},
  closeModal: () => {},
});

const ModalProvider = ({ children, ...modalStyles }: ModalProviderProps) => {
  const [isShowModal, setIsShowModal] = useState(true);
  const closeModal = () => setIsShowModal(false);
  const contextProps: ModalContextProps = useMemo(
    () => ({
      isShowModal,
      closeModal,
      openModal: () => setIsShowModal(true),
    }),
    [isShowModal],
  );

  return (
    <ModalContext.Provider value={contextProps}>
      {isShowModal && (
        <Modal closeModal={closeModal} {...modalStyles}>
          {children}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

const useModalContext = () => useContext(ModalContext);

export { ModalProvider, useModalContext };
