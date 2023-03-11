import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Route from '@/constants/routes';

const checkLogin = async ({ req, res }: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authOptions);

  if (session && session.id !== null) {
    return { props: { userId: session.id } };
  }

  return {
    props: {},
    redirect: {
      destination: Route.HOME,
      permanent: false,
    },
  };
};

export const checkRedirect = (
  serverSidePropsResult: GetServerSidePropsResult<unknown>,
) => 'redirect' in serverSidePropsResult;

export default checkLogin;
