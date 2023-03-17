import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { signIn, signOut } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import { css } from '@emotion/react';
import HeaderBar from '@/components/organisms/HeaderBar';
import ScreenModeButton from '@/components/organisms/SceenModeButton';
import ProfileSettingModal from '@/components/organisms/ProfileSettingModal';
import { ModalKey } from '@/constants/keys';
import Route from '@/constants/routes';
import useUserStatus from '@/hooks/useUserStatus';
import modalStore from '@/stores/modalStore';
import { signUp } from '@/services/api/user';
import UserError from '@/services/errors/UserError';
import { Introduce, UserName } from '@/types/features/user';
import 'react-toastify/dist/ReactToastify.css';

const mainStyle = ({
  isHome = false,
  isVisibleHeaderBar,
}: {
  isHome?: boolean;
  isVisibleHeaderBar: boolean;
}) => css`
  margin: auto;
  padding: ${isVisibleHeaderBar ? `5rem 20px` : `20px`};
  ${isHome ? `padding: 0` : `max-width: 80rem`};
`;

interface LayoutContextProps {
  isVisibleHeaderBar: boolean;
  showHeaderBar: () => void;
  showScreenModeButton: () => void;
  hideHeaderBar: () => void;
  hideScreenModeButton: () => void;
}

const LayoutContext = createContext<LayoutContextProps>({
  isVisibleHeaderBar: true,
  showHeaderBar: () => {},
  showScreenModeButton: () => {},
  hideHeaderBar: () => {},
  hideScreenModeButton: () => {},
});

const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const isHome = router.pathname === Route.HOME;

  const { session, isSignupRequired } = useUserStatus();
  const { openModal } = modalStore();
  const [isVisibleHeaderBar, setIsVisible] = useState(true);
  const [isVisibleScreenModeButton, setIsVisibleScreenModeButton] =
    useState(true);

  const contextProps: LayoutContextProps = useMemo(
    () => ({
      isVisibleHeaderBar,
      showHeaderBar: () => setIsVisible(true),
      hideHeaderBar: () => setIsVisible(false),
      showScreenModeButton: () => setIsVisibleScreenModeButton(true),
      hideScreenModeButton: () => setIsVisibleScreenModeButton(false),
    }),
    [isVisibleHeaderBar],
  );

  const handleSignUp = async ({
    name,
    introduce,
  }: {
    name: UserName;
    introduce: Introduce;
  }) => {
    try {
      if (isSignupRequired) {
        await signUp({ name, introduce, ...session });
        await signIn(session.oAuth);
      }
    } catch (error) {
      if (error instanceof UserError) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (isSignupRequired) {
      openModal(ModalKey.SIGNUP);
    }
  }, [isSignupRequired, openModal]);

  return (
    <LayoutContext.Provider value={contextProps}>
      {isVisibleHeaderBar && <HeaderBar />}
      <main css={mainStyle({ isHome, isVisibleHeaderBar })}>{children}</main>
      {isVisibleScreenModeButton && <ScreenModeButton />}
      <ProfileSettingModal
        modalKey={ModalKey.SIGNUP}
        title="회원가입"
        onComplete={handleSignUp}
        onCancel={() => signOut()}
      />
      <ToastContainer
        theme="colored"
        position="bottom-left"
        style={{ lineHeight: 1.4 }}
      />
    </LayoutContext.Provider>
  );
};

const useLayoutContext = () => useContext(LayoutContext);

export { LayoutProvider, useLayoutContext };
