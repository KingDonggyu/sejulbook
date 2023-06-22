import type { NextApiResponse } from 'next';
import ExceptionBase from '@/lib/HttpErrorException';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NextApiHandler = (req: any, res: NextApiResponse) => Promise<void>;

type NextApiMiddleware = (handler: NextApiHandler) => NextApiHandler;

const errorHandler: NextApiMiddleware = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    if (error instanceof ExceptionBase) {
      res.status(error.code).send(error);
    }
  }
};

export default errorHandler;
