import type { NextApiRequest, NextApiResponse } from 'next';
import { MethodNotAllowedException } from 'server/exceptions';
import FollowService from 'server/services/follow/follow.service';
import HttpMethods from '@/constants/httpMethods';
import auth from '@/lib/auth';

interface ExtendedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  method: HttpMethods.POST | HttpMethods.DELETE;
  query: { targetUserId: string; myUserId: string };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const followService = new FollowService();
  const targetUserId = Number(req.query.targetUserId);
  const myUserId = Number(req.query.myUserId);

  await auth(req, res, myUserId);

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

  throw new MethodNotAllowedException();
};

export default handler;
