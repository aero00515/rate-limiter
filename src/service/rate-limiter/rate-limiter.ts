import { Adapter } from './adapter';

class RateLimiter {
  private adapter: Adapter;
  private RATE_LIMIT: number;

  constructor(adapter: Adapter) {
    this.adapter = adapter;
    this.RATE_LIMIT = process.env.RATE_LIMIT ? +process.env.RATE_LIMIT : 60;
    const rateInterval = process.env.RATE_INTERVAL
      ? +process.env.RATE_INTERVAL
      : 60;

    this.adapter.setExpireSec && this.adapter.setExpireSec(rateInterval);
  }

  /**
   * Set limit number of request per minute
   * @param limit number of request per minute
   */
  setLimit = (limit: number): void => {
    this.RATE_LIMIT = limit;
  };

  getCount = async (ip: string): Promise<number> => this.adapter.getCount(ip);
  addCount = async (ip: string): Promise<number> => this.adapter.addCount(ip);

  isIpUnderLimit = async (ip: string): Promise<boolean> => {
    const count = await this.adapter.getCount(ip);
    if (count && count > this.RATE_LIMIT) {
      return false;
    }
    return true;
  };
}

let singleRateLimiter: RateLimiter;

export const rateLimiter = (adapter: Adapter): RateLimiter => {
  if (!singleRateLimiter) {
    singleRateLimiter = new RateLimiter(adapter);
  }
  return singleRateLimiter;
};
