/* eslint-disable import/first */
require('newrelic');

import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import handlebars from 'express-handlebars';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import logger from './logger/config';
import { code, message } from './config/messages';
import databaseConnect from './database/database';
import loginRouter from './api/routes/login';

const app = express();
const PORT: number = Number(process.env.PORT);
const HOST: string = String(process.env.HOST);

require('./config/passport')(passport);

// Connect to database
databaseConnect();

app.use(cors());
app.use(express.json());

// Setup logging
app.use(
	morgan((tokens, req: Request, res: Response) => {
		logger.info(
			`Method: ${tokens.method(req, res)} URL: ${tokens.url(req, res)} Status: ${tokens.status(req, res)} Resp Time: ${tokens['response-time'](
				req,
				res
			)} ms`
		);
		return null;
	})
);

// Setup handlebars
app.engine('.hbs', handlebars({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

// Express sessions
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false
		// cookie:{secure:true} Works only with HTTPS
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static Folder
app.use(express.static(path.join(__dirname, '/public')));

// Setup routers
app.use(loginRouter);

// Default route
app.use('/', (req: Request, res: Response) => {
	res.send({
		success: true,
		code: code.homeRoute,
		message: message.homeRoute
	});
});

app.listen(PORT, HOST, () => {
	logger.info(`NodeJS server listening on http://${HOST}:${PORT}`);
});
