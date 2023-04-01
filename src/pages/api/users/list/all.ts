import type { NextApiRequest, NextApiResponse } from 'next';
import userService from 'server/features/user/user.service';

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  const result = await userService.getAllUserId();

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.code).json(result);
};

export default handler;
