import type { NextApiRequest, NextApiResponse } from 'next';
import { BookReviewService } from '@/server/services';
import errorHandler from '@/server/middlewares/errorHandler';
import { MethodNotAllowedException } from '@/server/exceptions';
import HttpMethods from '@/constants/httpMethods';

type Query = { userId: string } | { userId: string; cursor: string };

interface ExtenedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: Query;
}

const handler = async (req: ExtenedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.GET) {
    const error = new MethodNotAllowedException();
    res.status(error.code).send(error);
  }

  const userId = +req.query.userId;

  if ('cursor' in req.query) {
    const data = await new BookReviewService().findFollowingPages({
      followerId: userId,
      targetId: +req.query.cursor || null,
    });
    res.status(200).json(data);
    return;
  }

  const data = await new BookReviewService().findTenFollowing(userId);
  res.status(200).json(data);
};

export default errorHandler(handler);
