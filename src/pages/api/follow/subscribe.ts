import { SubscribeRequest } from '@/types/features/follow';
import type { NextApiRequest, NextApiResponse } from 'next';
import followService from 'server/features/follow/follow.service';

interface ExtendedNextApiRequest extends NextApiRequest {
  method: 'POST';
  body: SubscribeRequest;
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const { targetUserId, myUserId } = req.body;

  const result = await followService.subscribe({
    followerId: myUserId,
    followingId: targetUserId,
  });

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.code).json(result);
};

export default handler;
