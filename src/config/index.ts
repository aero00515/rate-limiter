import * as dotenv from 'dotenv';

const init = (): dotenv.DotenvConfigOutput =>
  dotenv.config({
    path: `.${process.env.NODE_ENV}.env`,
  });

export { init };
