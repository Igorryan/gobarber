import { Router, request} from 'express';
import { celebrate, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileController = new ProfileController()
const profileRouter = Router();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', celebrate({
  'body': {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string(),
    old_password: Joi.string(),
    password_confirmation: Joi.string().valid(Joi.ref('password'))
  }
}),  profileController.update);

profileRouter.get('/',  profileController.show);

export default profileRouter;
