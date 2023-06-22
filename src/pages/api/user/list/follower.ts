import type { NextApiRequest, NextApiResponse } from 'next';
import UserService from '@/server/services/user.service';
import { MethodNotAllowedException } from '@/server/exceptions';
import errorHandler from '@/server/middlewares/errorHandler';
import HttpMethods from '@/constants/httpMethods';

interface ExtenedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: { userId: string; cursor: string };
}

const handler = async (req: ExtenedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.GET) {
    const error = new MethodNotAllowedException();
    res.status(error.code).send(error);
  }

  const data = await new UserService().findPagedFollowers({
    id: +req.query.userId,
    targetId: +req.query.cursor,
  });

  res.status(200).json(data);
};

export default errorHandler(handler);
