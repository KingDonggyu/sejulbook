import type { NextApiRequest, NextApiResponse } from 'next';
import { UserService } from '@/server/services';
import { MethodNotAllowedException } from '@/server/exceptions';
import errorHandler from '@/server/middlewares/errorHandler';
import HttpMethods from '@/constants/httpMethods';

interface ExtenedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: { query: string };
}

const handler = async (req: ExtenedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.GET) {
    const error = new MethodNotAllowedException();
    res.status(error.code).send(error);
  }

  const data = await new UserService().findAllByNamePrefix(req.query.query);
  res.status(200).json(data);
};

export default errorHandler(handler);
