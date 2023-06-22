import type { NextApiRequest, NextApiResponse } from 'next';
import TagService from '@/server/services/tag/tag.service';
import { MethodNotAllowedException } from '@/server/exceptions';
import errorHandler from '@/server/middlewares/errorHandler';
import HttpMethods from '@/constants/httpMethods';

interface ExtendedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: { query: string };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.GET) {
    const error = new MethodNotAllowedException();
    res.status(error.code).send(error);
  }

  const { query } = req.query;
  const data = await new TagService().findAllByTagName(query);

  res.status(200).json(data);
};

export default errorHandler(handler);
