import { Request, Response } from 'express';
import Story from '../../modals/Story';

const login = async (req: Request, res: Response) => {
	res.render('Login', {
		layout: 'login'
	});
};

const dashboard = async (req: Request, res: Response) => {
	const user: any = req.user!;

	try {
		const stories = await Story.find({ user: user.id }).lean();
		res.render('Dashboard', {
			name: user.firstName,
			stories
		});
	} catch (err) {
		res.render('error/500');
	}
};

export { login, dashboard };
