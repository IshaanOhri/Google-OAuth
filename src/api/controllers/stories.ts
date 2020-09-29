import { Request, Response } from 'express';
import logger from '../../logger/config';
import Story from '../../modals/Story';

const addStory = async (req: Request, res: Response) => {
	res.render('stories/add');
};

const processStory = async (req: Request, res: Response) => {
	try {
		const user: any = req.user!;
		req.body.user = user.id;
		await Story.create(req.body);
		res.redirect('/dashboard');
	} catch (err) {
		logger.error(err);
		res.render('error/500');
	}
};

export { addStory, processStory };
