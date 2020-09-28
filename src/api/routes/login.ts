import { Router } from 'express';
import { dashboard, login } from '../controllers/login';

const loginRouter: Router = Router();

// @desc	Login/Landing page
// @route	GET /
loginRouter.get('/', login);

// @desc	Dashboard
// @route	GET /dashboard
loginRouter.get('/dashboard', dashboard);

export default loginRouter;
