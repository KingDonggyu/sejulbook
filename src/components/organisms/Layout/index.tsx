import { ReactNode } from 'react';
import Head from 'next/head';
import HeaderBar from '@/components/organisms/HeaderBar';

interface LayoutProps {
  title?: string;
  children: ReactNode;
}

const Layout = ({ title, children }: LayoutProps) => (
  <>
    <Head>
      <title>{title && `${title} − `}세 줄 독후감</title>
    </Head>
    <HeaderBar />
    {children}
  </>
);

export default Layout;
