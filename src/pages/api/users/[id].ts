import type { NextApiRequest, NextApiResponse } from 'next';
import UserService from 'server/features/user/user.service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const result = await UserService.getUserById({ id: Number(id) });

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.code).json(result);
};

export default handler;
