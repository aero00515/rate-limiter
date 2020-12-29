describe('Rate Limiter Service Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
    jest.resetModuleRegistry();
  });

  it('should be defined', () => {
    const mockRedis = {
      RedisOptions: {},
      eval: jest.fn(),
      get: jest.fn(),
    };
    jest.mock('ioredis', () => ({
      __esModule: true,
      default: jest.fn(() => mockRedis),
    }));
    const { rateLimiterService } = require('../../../../src/service');
    expect(rateLimiterService.adapter).toBeDefined();
    expect(rateLimiterService.adapter.redisAdapter).toBeDefined();
  });

  it('should get same instance', () => {
    const mockRedis = {
      RedisOptions: {},
      eval: jest.fn(),
      get: jest.fn(),
    };
    jest.mock('ioredis', () => ({
      __esModule: true,
      default: jest.fn(() => mockRedis),
    }));
    const { rateLimiterService } = require('../../../../src/service');
    const adapterA = rateLimiterService.adapter.redisAdapter();
    const adapterB = rateLimiterService.adapter.redisAdapter();

    expect(adapterA).toEqual(adapterB);
  });

  it('should get instance with options', () => {
    const mockRedis = {
      RedisOptions: {},
      eval: jest.fn(),
      get: jest.fn(),
    };
    jest.mock('ioredis', () => ({
      __esModule: true,
      default: jest.fn(() => mockRedis),
    }));
    const { rateLimiterService } = require('../../../../src/service');
    const redisAdapter = rateLimiterService.adapter.redisAdapter({
      port: 1,
      host: '127.0.0.1',
      options: {},
    });
    expect(redisAdapter).toBeDefined();
  });

  it('should setExpireSec success by RedisAdapter instance ', async () => {
    const mockRedis = {
      RedisOptions: {},
      eval: jest.fn(),
      get: jest.fn(),
    };
    jest.mock('ioredis', () => ({
      __esModule: true,
      default: jest.fn(() => mockRedis),
    }));
    const { rateLimiterService } = require('../../../../src/service');

    const redisAdapter = rateLimiterService.adapter.redisAdapter();

    expect(redisAdapter.setExpireSec).toBeDefined();
    expect(redisAdapter.setExpireSec(1)).toBeUndefined();
  });

  it('should getCount once by RedisAdapter instance ', async () => {
    const mockRedis = {
      RedisOptions: {},
      eval: jest.fn(),
      get: jest.fn(),
    };
    jest.mock('ioredis', () => ({
      __esModule: true,
      default: jest.fn(() => mockRedis),
    }));
    const { rateLimiterService } = require('../../../../src/service');
    const testIp = ':::test:127.0.0.1';

    const redisAdapter = rateLimiterService.adapter.redisAdapter();
    await redisAdapter.getCount(testIp);

    expect(mockRedis.get).toBeCalledTimes(1);
  });

  it('should addCount once by RedisAdapter instance ', async () => {
    const mockRedis = {
      RedisOptions: {},
      eval: jest.fn(),
      get: jest.fn(),
    };
    jest.mock('ioredis', () => ({
      __esModule: true,
      default: jest.fn(() => mockRedis),
    }));
    const { rateLimiterService } = require('../../../../src/service');
    const testIp = ':::test:127.0.0.1';

    const redisAdapter = rateLimiterService.adapter.redisAdapter();
    await redisAdapter.addCount(testIp);

    expect(mockRedis.eval).toBeCalledTimes(1);
  });
});
