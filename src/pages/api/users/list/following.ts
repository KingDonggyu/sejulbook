import type { NextApiRequest, NextApiResponse } from 'next';
import { MethodNotAllowedException } from 'server/exceptions';
import UserService from 'server/services/user/user.service';
import HttpMethods from '@/constants/httpMethods';

interface ExtendedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: {
    id: string;
    targetId: string;
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.GET) {
    throw new MethodNotAllowedException();
  }

  const id = Number(req.query.id);
  const targetId = Number(req.query.targetId);

  const followings = await new UserService().findPagedFollowings({
    id,
    targetId,
  });

  res.status(200).json(followings);
};

export default handler;
