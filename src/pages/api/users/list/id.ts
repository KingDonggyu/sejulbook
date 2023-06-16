import HttpMethods from '@/constants/httpMethods';
import type { NextApiRequest, NextApiResponse } from 'next';
import { MethodNotAllowedException } from 'server/exceptions';
import UserService from 'server/services/user/user.service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.GET) {
    throw new MethodNotAllowedException();
  }

  const userIds = await new UserService().findAllId();
  res.status(200).json(userIds);
};

export default handler;
