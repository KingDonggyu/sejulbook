import { ReactNode } from 'react';
import { css } from '@emotion/react';
import HeaderBar from '@/components/organisms/HeaderBar';
import ScreenModeButton from '../SceenModeButton';

interface LayoutProps {
  children: ReactNode;
}

const mainStyle = css`
  margin: auto;
  padding: 5rem 20px;
  max-width: 80rem;
`;

const Layout = ({ children }: LayoutProps) => (
  <>
    <HeaderBar />
    <main css={mainStyle}>{children}</main>
    <ScreenModeButton />
  </>
);

export default Layout;
