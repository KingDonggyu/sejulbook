import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { MethodNotAllowedException } from '@/server/exceptions';
import errorHandler from '@/server/middlewares/errorHandler';
import HttpMethods from '@/constants/httpMethods';

interface ExtendedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: { query: string };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.GET) {
    const error = new MethodNotAllowedException();
    res.status(error.code).send(error);
    return;
  }

  const url = 'https://dapi.kakao.com/v3/search/book?target=people';
  const authToken = `KakaoAK ${process.env.SEJULBOOK_KAKAO_REST_API_KEY}`;

  const response = await axios.get(url, {
    params: { query: req.query.query },
    headers: { Authorization: authToken },
  });

  res.status(200).json(response.data);
};

export default errorHandler(handler);
