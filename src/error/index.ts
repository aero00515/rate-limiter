import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ServerResponse } from '../interface';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(getErrorResonse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
};

const getErrorResonse = (
  status: number,
  error: string
): ServerResponse<null> => ({
  status,
  data: null,
  error,
});

export { errorHandler };
