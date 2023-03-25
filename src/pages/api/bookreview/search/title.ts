import type { NextApiRequest, NextApiResponse } from 'next';
import bookReviewService from 'server/features/bookReview/bookReview.service';

interface ExtendedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: {
    query: string;
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const { query } = req.query;

  const result = await bookReviewService.searchBookReviewsByTitle({
    bookname: query,
  });

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.code).json(result);
};

export default handler;
