import * as bodyParser from 'body-parser';
import express from 'express';
import * as config from './config';
import { errorHandler } from './error';
import { rateLimitRouter } from './router';

const app = express();
// Initialize
// Ref: https://rules.sonarsource.com/javascript/RSPEC-5689
app.disable('x-powered-by');
app.set('trust proxy', true);
config.init();

// Middleware
app.use(bodyParser.json());

// Services
app.use(rateLimitRouter);

// Finalize
app.use(errorHandler);
app.listen(process.env.NODE_PORT || 3000, () => {
  console.log(process.env.NODE_ENV, process.env.NODE_PORT);
});
