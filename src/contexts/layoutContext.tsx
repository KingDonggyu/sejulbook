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
  showHeaderBar: () => void;
  showScreenModeButton: () => void;
  hideHeaderBar: () => void;
  hideScreenModeButton: () => void;
  showFooter: () => void;
  hideFooter: () => void;
}

const LayoutContext = createContext<LayoutContextProps>({
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

  const [hasHeaderBar, setHasHeaderBar] = useState(true);
  const [hasScreenModeButton, setHasScreenModeButton] = useState(true);
  const [hasFooter, setHasFooter] = useState(false);

  const contextProps: LayoutContextProps = useMemo(
    () => ({
      showHeaderBar: () => setHasHeaderBar(true),
      hideHeaderBar: () => setHasHeaderBar(false),
      showFooter: () => setHasFooter(true),
      hideFooter: () => setHasFooter(false),
      showScreenModeButton: () => setHasScreenModeButton(true),
      hideScreenModeButton: () => setHasScreenModeButton(false),
    }),
    [],
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
      {hasHeaderBar && <HeaderBar />}
      {children}
      <ProfileSettingModal
        modalKey={ModalKey.SIGNUP}
        title="회원가입"
        onComplete={handleSignUp}
        onCancel={() => signOut()}
      />
      {hasScreenModeButton && <ScreenModeButton />}
      <ToastContainer
        theme="colored"
        position="bottom-left"
        style={{ lineHeight: 1.4 }}
      />
      {hasFooter && <Footer />}
    </LayoutContext.Provider>
  );
};

const useLayoutContext = () => useContext(LayoutContext);

export { LayoutProvider, useLayoutContext };
