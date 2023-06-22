import type { NextApiRequest, NextApiResponse } from 'next';
import { MethodNotAllowedException } from '@/server/exceptions';
import HttpMethods from '@/constants/httpMethods';
import UserService from '@/server/services/user/user.service';
import errorHandler from '@/server/middlewares/errorHandler';

interface ExtendedNextApiRequest extends NextApiRequest {
  method: HttpMethods.POST;
  body: {
    sub: string;
    name: string;
    introduce: string;
    email: string;
    age: string;
    gender: string;
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.POST) {
    const error = new MethodNotAllowedException();
    res.status(error.code).send(error);
  }
  await new UserService().create({ ...req.body, gender: +req.body.gender });
  res.status(200).end();
};

export default errorHandler(handler);
