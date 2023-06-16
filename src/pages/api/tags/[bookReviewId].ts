import HttpMethods from '@/constants/httpMethods';
import type { NextApiRequest, NextApiResponse } from 'next';
import { MethodNotAllowedException } from 'server/exceptions';
import TagService from 'server/services/tag/tag.service';

interface ExtendedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: { bookReviewId: string };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.GET) {
    throw new MethodNotAllowedException();
  }

  const bookReviewId = +req.query.bookReviewId;
  const tags = await new TagService().findAllByBookReview(bookReviewId);

  res.status(200).json(tags);
};

export default handler;
