import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { signOut } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from '@/components/atoms/Footer';
import HeaderBar from '@/components/organisms/HeaderBar';
import ScreenModeButton from '@/components/organisms/SceenModeButton';
import ProfileSettingModal from '@/components/organisms/ProfileSettingModal';

import { ModalKey } from '@/constants/keys';
import useUserStatus from '@/hooks/useUserStatus';
import modalStore from '@/stores/modalStore';
import useSignUp from '@/hooks/services/mutations/useSignUp';
import type { Profile } from 'user';

interface LayoutContextProps {
  visible: { headerBar: boolean; screenModeButton: boolean; footer: boolean };
  showHeaderBar: () => void;
  showScreenModeButton: () => void;
  hideHeaderBar: () => void;
  hideScreenModeButton: () => void;
  showFooter: () => void;
  hideFooter: () => void;
}

const LayoutContext = createContext<LayoutContextProps>({
  visible: { headerBar: true, screenModeButton: true, footer: false },
  showHeaderBar: () => {},
  showScreenModeButton: () => {},
  hideHeaderBar: () => {},
  hideScreenModeButton: () => {},
  showFooter: () => {},
  hideFooter: () => {},
});

const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const { session, isSignupRequired } = useUserStatus();
  const signUp = useSignUp();
  const { openModal } = modalStore();

  const [visible, setVisible] = useState({
    headerBar: true,
    screenModeButton: true,
    footer: false,
  });

  const contextProps: LayoutContextProps = useMemo(
    () => ({
      visible,
      showHeaderBar: () => {
        if (!visible.headerBar) {
          setVisible({ ...visible, headerBar: true });
        }
      },
      hideHeaderBar: () => {
        if (visible.headerBar) {
          setVisible({ ...visible, headerBar: false });
        }
      },
      showFooter: () => {
        if (!visible.footer) {
          setVisible({ ...visible, footer: true });
        }
      },
      hideFooter: () => {
        if (visible.footer) {
          setVisible({ ...visible, footer: false });
        }
      },
      showScreenModeButton: () => {
        if (!visible.screenModeButton) {
          setVisible({ ...visible, screenModeButton: true });
        }
      },
      hideScreenModeButton: () => {
        if (visible.screenModeButton) {
          setVisible({ ...visible, screenModeButton: false });
        }
      },
    }),
    [visible],
  );

  const handleSignUp = async ({ name, introduce }: Profile) => {
    if (isSignupRequired) {
      signUp({ name, introduce, ...session });
    }
  };

  useEffect(() => {
    if (isSignupRequired) {
      openModal(ModalKey.SIGNUP);
    }
  }, [isSignupRequired, openModal]);

  return (
    <LayoutContext.Provider value={contextProps}>
      {visible.headerBar && <HeaderBar />}
      {children}
      <ProfileSettingModal
        modalKey={ModalKey.SIGNUP}
        title="회원가입"
        onComplete={handleSignUp}
        onCancel={() => signOut()}
      />
      {visible.screenModeButton && <ScreenModeButton />}
      <ToastContainer
        theme="colored"
        position="bottom-left"
        style={{ lineHeight: 1.4 }}
      />
      {visible.footer && <Footer />}
    </LayoutContext.Provider>
  );
};

const useLayoutContext = () => useContext(LayoutContext);

export { LayoutProvider, useLayoutContext };
