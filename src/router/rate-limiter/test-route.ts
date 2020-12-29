import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { rateLimiterService } from '../../service';

const testRoute = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response<number | string>> => {
  const adapter = rateLimiterService.adapter.redisAdapter({
    host: process.env.REDIS_HOST || '127.0.0.1',
  });
  const rateLimiter = rateLimiterService.rateLimiter(adapter);
  await rateLimiter.addCount(req.ip);
  const isUnderRateLimit = await rateLimiter.isIpUnderLimit(req.ip);
  if (isUnderRateLimit) {
    const count = await rateLimiter.getCount(req.ip);
    return res.status(StatusCodes.OK).json(count);
  }
  return res.status(StatusCodes.TOO_MANY_REQUESTS).json('Error');
};

export { testRoute };
