import { StatusCodes } from 'http-status-codes';
import * as httpMocks from 'node-mocks-http';
import { testRoute } from '../../../src/router/rate-limiter/test-route';

jest.mock('../../../src/service', () => ({
  rateLimiterService: {
    rateLimiter: jest.fn(() => ({
      addCount: jest.fn(),
      getCount: jest.fn(),
      isIpUnderLimit: jest.fn(() => false),
    })),
    adapter: {
      redisAdapter: jest.fn(),
    },
  },
}));

describe('Rate Limiter Router testRoute', () => {
  it('should be defined', () => {
    expect(testRoute).toBeDefined();
  });

  it('should fail with 429 too many request error response', async () => {
    const mockRequest = httpMocks.createRequest();
    const mockResponse = httpMocks.createResponse();
    mockRequest.ip = ':::test:127.0.0.1';

    await testRoute(mockRequest, mockResponse);

    expect(mockResponse._getStatusCode()).toBe(StatusCodes.TOO_MANY_REQUESTS);
    expect(mockResponse._getJSONData()).toBe('Error');
  });
});
