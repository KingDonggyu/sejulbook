import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { HttpFailed } from '@/types/http';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { userError } from '@/constants/message';
import { UserId } from '@/types/features/user';

interface ExtendedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: unknown;
}

const checkAuth = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse,
  userId: UserId,
) => {
  const session = await getServerSession(req, res, authOptions);

  if (!userId) {
    const result: HttpFailed = {
      error: true,
      code: 401,
      message: userError.NOT_LOGGED,
    };

    res.status(result.code).json(result);
    return false;
  }

  if (session && session.id === Number(userId)) {
    return session.id;
  }

  const result: HttpFailed = {
    error: true,
    code: 401,
    message: userError.NO_AUTH,
  };

  res.status(result.code).json(result);
  return false;
};

export default checkAuth;
