import { StatusCodes } from 'http-status-codes';
import * as httpMocks from 'node-mocks-http';
import { errorHandler } from '../../src/error';

describe('Test Error', () => {
  it('should be defined', () => {
    const mockErrorMessage = 'test';
    const mockError = new Error(mockErrorMessage);
    const mockRequest = httpMocks.createRequest();
    const mockResponse = httpMocks.createResponse();

    errorHandler(mockError, mockRequest, mockResponse, jest.fn());

    expect(mockResponse).toBeDefined();
    expect(mockResponse._getStatusCode()).toEqual(
      StatusCodes.INTERNAL_SERVER_ERROR
    );
    expect(mockResponse._getJSONData()?.error).toEqual(mockErrorMessage);
  });
});
