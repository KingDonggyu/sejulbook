import type { NextApiRequest, NextApiResponse } from 'next';
import tagService from 'server/features/tag/tag.service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { bookReviewId } = req.query;
  const result = await tagService.getTags({
    bookReviewId: Number(bookReviewId),
  });

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.code).json(result);
};

export default handler;
