import type { NextApiRequest, NextApiResponse } from 'next';
import categoryService from 'server/features/category/category.service';

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  const result = await categoryService.getCategories();

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.code).json(result);
};

export default handler;
