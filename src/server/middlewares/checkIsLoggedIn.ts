import type { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

interface LoggedInResponse {
  isLoggedIn: true;
  userId: number;
}

interface NotLoggedInResponse {
  isLoggedIn: false;
  userId: null;
}

type CheckIsLoggedInResponse = LoggedInResponse | NotLoggedInResponse;

const checkIsLoggedIn = async ({
  req,
  res,
}: GetServerSidePropsContext): Promise<CheckIsLoggedInResponse> => {
  const session = await getServerSession(req, res, authOptions);

  if (session && session.id !== null) {
    return {
      isLoggedIn: true,
      userId: session.id,
    };
  }

  return { isLoggedIn: false, userId: null };
};

export default checkIsLoggedIn;
