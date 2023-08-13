import type { NextApiRequest, NextApiResponse } from 'next';
import { BookReviewService, UserService } from '@/server/services';
import { MethodNotAllowedException } from '@/server/exceptions';
import authentication from '@/server/middlewares/authentication';
import errorHandler from '@/server/middlewares/errorHandler';
import HttpMethods from '@/constants/httpMethods';

interface NextGetApiRequest extends Omit<NextApiRequest, 'query'> {
  method: HttpMethods.GET;
  query: { id: string };
}

interface NextDeleteApiRequest extends Omit<NextApiRequest, 'query'> {
  method: HttpMethods.DELETE;
  query: { id: string };
}

interface NextPutApiRequest extends Omit<NextApiRequest, 'query'> {
  method: HttpMethods.PUT;
  query: { id: string };
  body: { name: string; introduce: string };
}

type ExtendedNextApiRequest =
  | NextGetApiRequest
  | NextDeleteApiRequest
  | NextPutApiRequest;

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const userService = new UserService();
  const id = +req.query.id;

  if (req.method === HttpMethods.GET) {
    const data = await userService.findById(id);
    res.status(200).json(data);
    return;
  }

  await authentication(req, res, id);

  if (req.method === HttpMethods.PUT) {
    await userService.update({ id, ...req.body });
    res.status(200).end();
    return;
  }

  if (req.method === HttpMethods.DELETE) {
    await Promise.all([
      new BookReviewService().deleteAllByUser(id),
      userService.delete(id),
    ]);
    res.status(200).end();
    return;
  }

  const error = new MethodNotAllowedException();
  res.status(error.code).send(error);
};

export default errorHandler(handler);
