import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Route from '@/constants/routes';

const checkLogin: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (session && session.id !== null) {
    return { props: {} };
  }

  return {
    props: {},
    redirect: {
      destination: Route.HOME,
      permanent: false,
    },
  };
};

export default checkLogin;
