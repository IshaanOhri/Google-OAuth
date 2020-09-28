import { Request, Response } from 'express';

const login = async (req: Request, res: Response) => {
	res.render('Login', {
		layout: 'login'
	});
};

const dashboard = async (req: Request, res: Response) => {
	res.send({
		success: true,
		message: 'Dashboard'
	});
};

export { login, dashboard };
