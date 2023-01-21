import { ReactNode } from 'react';
import HeaderBar from '@/components/organisms/HeaderBar';

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <HeaderBar />
    {children}
  </>
);

export default Layout;
