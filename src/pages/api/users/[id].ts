import type { NextApiRequest, NextApiResponse } from 'next';
import UserService from 'server/services/user/user.service';
import { MethodNotAllowedException } from 'server/exceptions';
import checkAuth from '@/services/middlewares/checkAuth';
import HttpMethods from '@/constants/httpMethods';
import { UpdateUserRequest } from '@/types/user/update';

interface UserApiRequest extends Omit<NextApiRequest, 'query'> {
  query: { id: string };
}

interface NextGetApiRequest extends UserApiRequest {
  method: HttpMethods.GET;
}

interface NextPutApiRequest extends UserApiRequest {
  method: HttpMethods.PUT;
  body: UpdateUserRequest;
}

interface NextDeleteApiRequest extends UserApiRequest {
  method: HttpMethods.DELETE;
}

type ExtendedNextApiRequest =
  | NextGetApiRequest
  | NextPutApiRequest
  | NextDeleteApiRequest;

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const userService = new UserService();
  const id = Number(req.query.id);

  switch (req.method) {
    case HttpMethods.GET: {
      const user = userService.findById(id);
      res.status(200).json(user);
      break;
    }
    case HttpMethods.PUT:
      await checkAuth(req, res, id);
      await userService.update({ id, ...req.body });
      res.status(200).end();
      break;
    case HttpMethods.DELETE:
      await checkAuth(req, res, id);
      await userService.delete(id);
      res.status(200).end();
      break;
    default:
      throw new MethodNotAllowedException();
  }
};

export default handler;
