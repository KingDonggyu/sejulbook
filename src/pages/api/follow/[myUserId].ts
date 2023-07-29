import type { NextApiRequest, NextApiResponse } from 'next';
import { MethodNotAllowedException } from '@/server/exceptions';
import { FollowService } from '@/server/services';
import HttpMethods from '@/constants/httpMethods';
import authentication from '@/server/middlewares/authentication';
import errorHandler from '@/server/middlewares/errorHandler';

interface ExtendedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  method: HttpMethods.GET | HttpMethods.POST | HttpMethods.DELETE;
  query: { targetUserId: string; myUserId: string };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const followService = new FollowService();
  const targetUserId = Number(req.query.targetUserId);
  const myUserId = Number(req.query.myUserId);

  if (req.method === HttpMethods.GET) {
    const data = await followService.findFollowInfo({ myUserId, targetUserId });
    res.status(200).json(data);
    return;
  }

  await authentication(req, res, myUserId);

  if (req.method === HttpMethods.POST) {
    await followService.create({ myUserId, targetUserId });
    res.status(200).end();
    return;
  }

  if (req.method === HttpMethods.DELETE) {
    await followService.delete({ myUserId, targetUserId });
    res.status(200).end();
    return;
  }

  const error = new MethodNotAllowedException();
  res.status(error.code).send(error);
};

export default errorHandler(handler);
