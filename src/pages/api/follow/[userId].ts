import type { NextApiRequest, NextApiResponse } from 'next';
import { UserId } from '@/types/features/user';
import followService from 'server/features/follow/follow.service';

interface NextGetApiRequest extends Omit<NextApiRequest, 'query'> {
  method: 'GET';
  query: { userId: UserId; myId?: UserId };
}

interface NextDeleteApiRequest extends Omit<NextApiRequest, 'query'> {
  method: 'DELETE';
  query: { userId: UserId; myId: UserId };
}

type ExtendedNextApiRequest = NextGetApiRequest | NextDeleteApiRequest;

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  let result;
  const { userId } = req.query;

  if (req.method === 'GET') {
    result = await followService.getFollowInfo({
      targetUserId: userId,
      myUserId: req.query.myId,
    });
  } else {
    result = await followService.unsubscribe({
      followerId: req.query.myId,
      followingId: userId,
    });
  }

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.code).json(result);
};

export default handler;
