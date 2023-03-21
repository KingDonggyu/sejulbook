import type { NextApiRequest, NextApiResponse } from 'next';
import { UserId } from '@/types/features/user';
import followService from 'server/features/follow/follow.service';

interface ExtendedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  method: 'GET' | 'DELETE';
  query: { userId: UserId; myId?: UserId };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const { userId, myId } = req.query;

  const result = await followService.getFollowInfo({
    targetUserId: userId,
    myUserId: myId,
  });

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.code).json(result);
};

export default handler;
