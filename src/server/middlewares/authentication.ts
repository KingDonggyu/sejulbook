import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { UnauthorizedException } from '@/server/exceptions';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { userError } from '@/constants/message';

const authentication = async (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number,
) => {
  if (!userId) {
    throw new UnauthorizedException(userError.NOT_LOGGED);
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    throw new UnauthorizedException(userError.NO_AUTH);
  }

  if (session.id !== Number(userId)) {
    throw new UnauthorizedException(userError.NO_AUTH);
  }
};

export default authentication;
