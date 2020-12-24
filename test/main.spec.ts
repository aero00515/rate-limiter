describe('Main application test', () => {
  let mockDisable: jest.FunctionLike;
  let mockUse: jest.FunctionLike;
  let mockListen: jest.FunctionLike;

  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
    jest.resetModuleRegistry();

    mockDisable = jest.fn();
    mockUse = jest.fn();
    mockListen = jest.fn((port, cb) => {
      cb();
      return {
        port,
        cb,
      };
    });

    const mockExpress = jest.fn(() => ({
      disable: mockDisable,
      use: mockUse,
      listen: mockListen,
    }));

    jest.mock('express', () => mockExpress);
  });

  it('should be empty node port', () => {
    require('../src/main');

    expect(mockDisable).toBeCalledTimes(1);
    expect(mockUse).toBeCalled();
    expect(mockListen).toBeCalledTimes(1);
  });
});
