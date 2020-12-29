import express from 'express';
import { testRoute } from './test-route';

const ROUTE_PRIFIX = '/rate-limiter';

const router = express.Router();

router.post(`${ROUTE_PRIFIX}/test`, testRoute);

export { router as rateLimitRouter };
