import type { NextApiRequest, NextApiResponse } from 'next';
import bookReviewService from 'server/features/bookReview/bookReview.service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const result = await bookReviewService.getBookReivew({ id: Number(id) });

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.code).json(result);
};

export default handler;
