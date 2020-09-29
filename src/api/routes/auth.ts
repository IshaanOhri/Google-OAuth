import { Request, Response, Router } from 'express';
import passport from 'passport';

const authRouter: Router = Router();

// @desc	Auth with Google
// @route	GET /auth/google
authRouter.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc	Google auth callback
// @route	GET /auth/google/callback
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req: Request, res: Response) => {
	res.redirect('/dashboard');
});

export default authRouter;
