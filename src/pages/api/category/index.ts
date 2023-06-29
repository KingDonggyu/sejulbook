import type { NextApiRequest, NextApiResponse } from 'next';
import CategoryService from '@/server/services/category.service';
import { MethodNotAllowedException } from '@/server/exceptions';
import errorHandler from '@/server/middlewares/errorHandler';
import HttpMethods from '@/constants/httpMethods';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.GET) {
    const error = new MethodNotAllowedException();
    res.status(error.code).send(error);
  }

  const data = await new CategoryService().findAll();
  res.status(200).json(data);
};

export default errorHandler(handler);