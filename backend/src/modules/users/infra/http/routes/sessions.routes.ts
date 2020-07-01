import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', celebrate({
  'body': {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}), sessionsController.create);

export default sessionsRouter;
