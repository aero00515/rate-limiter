import Redis from 'ioredis';
import * as fs from 'fs';
import * as path from 'path';
import { Adapter } from './adapter';

class RedisAdapter implements Adapter {
  private readonly COMMAND_INCR_PATH = path.join(__dirname, 'customIncr.lua');
  private expireSec = 60;
  private redisClient: Redis.Redis;

  constructor(redisConfig?: {
    port?: number;
    host?: string;
    options?: Redis.RedisOptions;
  }) {
    this.redisClient = new Redis(
      redisConfig?.port,
      redisConfig?.host,
      redisConfig?.options
    );
  }

  setExpireSec = (expireSec: number): void => {
    this.expireSec = expireSec;
  };

  addCount = async (ip: string): Promise<number> => {
    const count: number = await this.redisClient.eval(
      fs.readFileSync(this.COMMAND_INCR_PATH, 'utf8'),
      2,
      ['ip', 'expireSec', ip, this.expireSec]
    );
    return count;
  };

  getCount = async (ip: string): Promise<number> => {
    const count = (await this.redisClient.get(ip)) || 0;
    return +count;
  };
}

let singleRedisAdapter: RedisAdapter;

export const redisAdapter = (redisConfig?: {
  port?: number;
  host?: string;
  options?: Redis.RedisOptions;
}): RedisAdapter => {
  if (!singleRedisAdapter) {
    singleRedisAdapter = new RedisAdapter(redisConfig);
  }
  return singleRedisAdapter;
};
