import GoogleStrategy from 'passport-google-oauth20';
import mongoose from 'mongoose';
import User from '../modals/User';
import logger from '../logger/config';

module.exports = (passport: any) => {
	passport.use(
		new GoogleStrategy.Strategy(
			{
				clientID: String(process.env.GOOGLE_CLIENT_ID),
				clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
				callbackURL: '/auth/google/callback'
			},
			async (accessToken, refreshToken, profile, done) => {
				logger.info(profile);
			}
		)
	);
	passport.serializeUser((user: any, done: any) => {
		done(null, user.id);
	});

	passport.deserialUser((id: any, done: any) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
};
