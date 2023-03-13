import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { HttpFailed } from '@/types/http';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { userError } from '@/constants/message';
import { UserId } from '@/types/features/user';

interface NextPostApiRequest extends NextApiRequest {
  body: { userId: UserId };
}

interface NextGetApiRequest extends Omit<NextApiRequest, 'query'> {
  query: { userId: UserId };
}

type ExtendedNextApiRequest = NextPostApiRequest | NextGetApiRequest;

const checkAuth = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const userId = Number(req.body.userId) || Number(req.query.userId);

  if (!userId) {
    const result: HttpFailed = {
      error: true,
      code: 401,
      message: userError.NOT_LOGGED,
    };

    res.status(result.code).json(result);
    return false;
  }

  if (session && session.id === userId) {
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
