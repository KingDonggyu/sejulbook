import type { NextApiRequest, NextApiResponse } from 'next';
import { MethodNotAllowedException } from 'server/exceptions';
import FollowService from 'server/services/follow/follow.service';
import HttpMethods from '@/constants/httpMethods';
import checkAuth from '@/services/middlewares/checkAuth';

interface NextGetApiRequest extends Omit<NextApiRequest, 'query'> {
  method: HttpMethods.GET;
  query: { targetUserId: string; myUserId?: string };
}

interface NextDeleteApiRequest extends Omit<NextApiRequest, 'query'> {
  method: HttpMethods.DELETE;
  query: { targetUserId: string; myUserId: string };
}

interface NextPostApiRequest extends Omit<NextApiRequest, 'query'> {
  method: HttpMethods.POST;
  query: { targetUserId: string; myUserId: string };
}

type ExtendedNextApiRequest =
  | NextGetApiRequest
  | NextDeleteApiRequest
  | NextPostApiRequest;

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const followService = new FollowService();
  const targetUserId = Number(req.query.targetUserId);

  switch (req.method) {
    case HttpMethods.GET: {
      const followInfo = await followService.findFollowInfo({
        targetUserId,
        myUserId: req.query.myUserId ? +req.query.myUserId : undefined,
      });
      res.status(200).json(followInfo);
      break;
    }
    // 구독 취소
    case HttpMethods.DELETE:
      await checkAuth(req, res, +req.query.myUserId);
      await followService.delete({
        followingId: targetUserId,
        followerId: +req.query.myUserId,
      });
      break;
    // 구독
    case HttpMethods.POST:
      await checkAuth(req, res, +req.query.myUserId);
      await followService.create({
        followingId: targetUserId,
        followerId: +req.query.myUserId,
      });
      break;
    default:
      throw new MethodNotAllowedException();
  }

  res.status(200).end();
};

export default handler;
