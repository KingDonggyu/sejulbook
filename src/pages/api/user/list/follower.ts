import type { NextApiRequest, NextApiResponse } from 'next';
import UserService from '@/server/services/user/user.service';
import { MethodNotAllowedException } from '@/server/exceptions';
import HttpMethods from '@/constants/httpMethods';

interface ExtenedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: { userId: string; cursor: string };
}

const handler = async (req: ExtenedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.GET) {
    throw new MethodNotAllowedException();
  }

  const data = await new UserService().findPagedFollowers({
    id: +req.query.userId,
    targetId: +req.query.cursor,
  });

  res.status(200).json(data);
};

export default handler;
