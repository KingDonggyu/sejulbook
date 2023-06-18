import type { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const checkIsLoggedIn = async ({ req, res }: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authOptions);
  return session && session.id !== null;
};

export default checkIsLoggedIn;
