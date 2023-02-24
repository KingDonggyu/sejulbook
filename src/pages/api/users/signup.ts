import type { NextApiRequest, NextApiResponse } from 'next';
import UserService from 'server/user/user.service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await UserService.signUp(req.body);

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.code).json(result);
};

export default handler;
