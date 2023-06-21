import type { NextApiRequest, NextApiResponse } from 'next';
import TagService from '@/server/services/tag/tag.service';
import { MethodNotAllowedException } from '@/server/exceptions';
import HttpMethods from '@/constants/httpMethods';

interface ExtendedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: { bookReviewId: string };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.GET) {
    throw new MethodNotAllowedException();
  }

  const bookReviewId = +req.query.bookReviewId;
  const data = await new TagService().findAllByBookReview(bookReviewId);

  res.status(200).json(data);
};

export default handler;
