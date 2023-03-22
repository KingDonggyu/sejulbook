import { FollowUserListRequst } from '@/types/features/user';
import type { NextApiRequest, NextApiResponse } from 'next';
import userService from 'server/features/user/user.service';

interface ExtendedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: FollowUserListRequst;
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const { userId, pageParams = null } = req.query;

  const result = await userService.getFollowUserList({
    id: userId,
    maxFollowId: pageParams,
    isFollowing: true,
  });

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.code).json(result);
};

export default handler;
