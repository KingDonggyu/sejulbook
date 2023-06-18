import type { NextApiRequest, NextApiResponse } from 'next';
import UserService from 'server/services/user/user.service';
import { MethodNotAllowedException } from 'server/exceptions';
import checkAuth from '@/services/middlewares/checkAuth';
import HttpMethods from '@/constants/httpMethods';

interface NextDeleteApiRequest extends Omit<NextApiRequest, 'query'> {
  method: HttpMethods.DELETE;
  query: { id: string };
}

interface NextPutApiRequest extends Omit<NextApiRequest, 'query'> {
  method: HttpMethods.PUT;
  query: { id: string };
  body: { name: string; introduce: string };
}

type ExtendedNextApiRequest = NextDeleteApiRequest | NextPutApiRequest;

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const userService = new UserService();
  const id = +req.query.id;

  await checkAuth(req, res, id);

  if (req.method === HttpMethods.PUT) {
    await userService.update({ id, ...req.body });
    res.status(200).end();
    return;
  }

  if (req.method === HttpMethods.DELETE) {
    await userService.delete(id);
    res.status(200).end();
    return;
  }

  throw new MethodNotAllowedException();
};

export default handler;
