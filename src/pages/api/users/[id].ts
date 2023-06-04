import type { NextApiRequest, NextApiResponse } from 'next';
import userService from 'server/features/user/user.service';
import checkAuth from '@/services/middlewares/checkAuth';
import { User } from '@/types/features/user';

interface NextGetApiRequest extends Omit<NextApiRequest, 'query'> {
  method: 'GET';
  query: Pick<User, 'id'>;
}

interface NextPutApiRequest extends Omit<NextApiRequest, 'query'> {
  method: 'PUT';
  query: Pick<User, 'id'>;
  body: Omit<User, 'id'>;
}

interface NextDeleteApiRequest extends Omit<NextApiRequest, 'query'> {
  method: 'DELETE';
  query: Pick<User, 'id'>;
}

type ExtendedNextApiRequest =
  | NextGetApiRequest
  | NextPutApiRequest
  | NextDeleteApiRequest;

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  let result;
  const id = Number(req.query.id);

  if (req.method === 'GET') {
    result = await userService.getUserById({ id });
  } else if (req.method === 'DELETE') {
    if (!(await checkAuth(req, res, id))) {
      return;
    }
    result = await userService.deleteUser({ id });
  } else {
    if (!(await checkAuth(req, res, id))) {
      return;
    }
    result = await userService.updateUser({ id, ...req.body });
  }

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.code).json(result);
};

export default handler;
