import { Router } from 'express';
import { ensureAuth } from '../../middleware/auth';
import { addStory, processStory } from '../controllers/stories';

const storyRouter: Router = Router();

// @desc	Show add page
// @route	GET /stories/add
storyRouter.get('/add', ensureAuth, addStory);

// @desc	Process add form
// @route	POST /stories
storyRouter.post('/', ensureAuth, processStory);

export default storyRouter;
