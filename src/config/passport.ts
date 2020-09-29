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
				const newUser = {
					googleID: profile.id,
					displayName: profile.displayName,
					firstName: profile.name?.givenName,
					lastName: profile.name?.familyName,
					image: profile.photos![0].value
				};

				try {
					let user = await User.findOne({ googleID: profile.id });

					if (user) {
						done(undefined, user);
					} else {
						user = await User.create(newUser);
						done(undefined, user);
					}
				} catch (err) {
					logger.error(err);
				}
			}
		)
	);
	passport.serializeUser((user: any, done: any) => {
		done(null, user.id);
	});

	passport.deserializeUser((id: any, done: any) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
};
