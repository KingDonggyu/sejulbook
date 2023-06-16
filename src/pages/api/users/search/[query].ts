import HttpMethods from '@/constants/httpMethods';
import type { NextApiRequest, NextApiResponse } from 'next';
import { MethodNotAllowedException } from 'server/exceptions';
import UserService from 'server/services/user/user.service';

interface ExtendedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  method: HttpMethods.GET;
  query: {
    query: string;
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.GET) {
    throw new MethodNotAllowedException();
  }

  const { query } = req.query;
  const users = await new UserService().findAllByNamePrefix(query);

  res.status(200).json(users);
};

export default handler;
