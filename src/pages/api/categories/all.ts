import type { NextApiRequest, NextApiResponse } from 'next';
import { MethodNotAllowedException } from 'server/exceptions';
import CategoryService from 'server/services/category/category.service';
import HttpMethods from '@/constants/httpMethods';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.GET) {
    throw new MethodNotAllowedException();
  }

  const categories = await new CategoryService().findAll();
  res.status(200).json(categories);
};

export default handler;
