import type { NextApiRequest, NextApiResponse } from 'next';
import bookReviewService from 'server/features/bookReview/bookReview.service';

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  const result = await bookReviewService.getAllBookReviewId();

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.code).json(result);
};

export default handler;
