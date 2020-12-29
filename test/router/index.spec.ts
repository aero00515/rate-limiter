describe('Router index', () => {
  it('should be defined', () => {
    jest.mock('../../src/router/rate-limiter', () => ({
      rateLimitRouter: jest.fn(),
    }));

    const { rateLimitRouter } = require('../../src/router');

    expect(rateLimitRouter).toBeDefined();
  });
});
