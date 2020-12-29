describe('Rate Limiter Service Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
    jest.resetModuleRegistry();
  });

  it('should be defined', () => {
    const { rateLimiterService } = require('../../../src/service');
    expect(rateLimiterService.rateLimiter).toBeDefined();
  });

  it('should be defined with env settings', () => {
    process.env.RATE_LIMIT = '1';
    process.env.RATE_INTERVAL = '1';
    const mockAdapter = {
      setExpireSec: jest.fn(),
      addCount: jest.fn(),
      getCount: jest.fn(),
    };

    const { rateLimiterService } = require('../../../src/service');
    const rateLimiter = rateLimiterService.rateLimiter(mockAdapter);
    expect(rateLimiter).toBeDefined();

    delete process.env.RATE_LIMIT;
    delete process.env.RATE_INTERVAL;
  });

  it('should get same instance', () => {
    const { rateLimiterService } = require('../../../src/service');
    const mockAdapter = {
      setExpireSec: jest.fn(),
      addCount: jest.fn(),
      getCount: jest.fn(),
    };
    const rateLimiterA = rateLimiterService.rateLimiter(mockAdapter);
    const rateLimiterB = rateLimiterService.rateLimiter(mockAdapter);

    expect(rateLimiterA).toEqual(rateLimiterB);
  });

  it('should get RateLimiter instance', () => {
    const { rateLimiterService } = require('../../../src/service');
    const mockAdapter = {
      setExpireSec: jest.fn(),
      addCount: jest.fn(),
      getCount: jest.fn(),
    };
    const rateLimiter = rateLimiterService.rateLimiter(mockAdapter);

    expect(rateLimiter).toBeDefined();
  });

  it('should getCount once by RateLimiter instance ', async () => {
    const { rateLimiterService } = require('../../../src/service');
    const mockAdapter = {
      setExpireSec: jest.fn(),
      addCount: jest.fn(),
      getCount: jest.fn(),
    };
    const testIp = ':::test:127.0.0.1';

    const rateLimiter = rateLimiterService.rateLimiter(mockAdapter);
    await rateLimiter.getCount(testIp);

    expect(mockAdapter.getCount).toBeCalledTimes(1);
  });

  it('should addCount once by RateLimiter instance ', async () => {
    const { rateLimiterService } = require('../../../src/service');
    const mockAdapter = {
      setExpireSec: jest.fn(),
      addCount: jest.fn(),
      getCount: jest.fn(),
    };
    const testIp = ':::test:127.0.0.1';

    const rateLimiter = rateLimiterService.rateLimiter(mockAdapter);
    await rateLimiter.addCount(testIp);

    expect(mockAdapter.addCount).toBeCalledTimes(1);
  });

  it('should setLimit success by RateLimiter instance ', async () => {
    const { rateLimiterService } = require('../../../src/service');
    const mockAdapter = {
      setExpireSec: jest.fn(),
      addCount: jest.fn(),
      getCount: jest.fn(),
    };

    const rateLimiter = rateLimiterService.rateLimiter(mockAdapter);

    expect(rateLimiter.setLimit).toBeDefined();
    expect(await rateLimiter.setLimit(1)).toBeUndefined();
  });

  it('should isIpUnderLimit true and getCount once by RateLimiter instance ', async () => {
    const { rateLimiterService } = require('../../../src/service');
    const mockAdapter = {
      setExpireSec: jest.fn(),
      addCount: jest.fn(),
      getCount: jest.fn(),
    };
    const testIp = ':::test:127.0.0.1';

    const rateLimiter = rateLimiterService.rateLimiter(mockAdapter);
    const isIpUnderLimit = await rateLimiter.isIpUnderLimit(testIp);

    expect(mockAdapter.getCount).toBeCalledTimes(1);
    expect(isIpUnderLimit).toBeTruthy();
  });

  it('should isIpUnderLimit false and getCount once by RateLimiter instance ', async () => {
    const { rateLimiterService } = require('../../../src/service');
    const mockAdapter = {
      setExpireSec: jest.fn(),
      addCount: jest.fn(),
      getCount: jest.fn(() => 2),
    };
    const testIp = ':::test:127.0.0.1';

    const rateLimiter = rateLimiterService.rateLimiter(mockAdapter);
    rateLimiter.setLimit(1);

    const isIpUnderLimit = await rateLimiter.isIpUnderLimit(testIp);

    expect(mockAdapter.getCount).toBeCalledTimes(1);
    expect(isIpUnderLimit).toBeFalsy();
  });
});
