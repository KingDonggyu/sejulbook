import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { HttpFailed } from '@/types/http';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { userError } from '@/constants/message';

const checkAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!req.body.userId) {
    const result: HttpFailed = {
      error: true,
      code: 401,
      message: userError.NOT_LOGGED,
    };

    res.status(result.code).json(result);
  }

  if (session && session.id === req.body.userId) {
    return;
  }

  const result: HttpFailed = {
    error: true,
    code: 401,
    message: userError.NO_AUTH,
  };

  res.status(result.code).json(result);
};

export default checkAuth;
