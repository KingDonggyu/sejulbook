import type { NextApiRequest, NextApiResponse } from 'next';
import UserService from 'server/services/user/user.service';
import { MethodNotAllowedException } from 'server/exceptions';
import HttpMethods from '@/constants/httpMethods';
import { SignUpRequest } from '@/types/user/signup';

interface NextPostApiRequest extends NextApiRequest {
  method: HttpMethods.POST;
  body: SignUpRequest;
}

const handler = async (req: NextPostApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.POST) {
    throw new MethodNotAllowedException();
  }

  await new UserService().create(req.body);
  res.status(200).end();
};

export default handler;
