import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';

const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()
const passwordRouter = Router();

passwordRouter.post('/forgot', celebrate({
  'body': {
    email: Joi.string().email().required(),
  },
}),forgotPasswordController.create);

passwordRouter.post('/reset', celebrate({
  'body': {
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')),
  },
}), resetPasswordController.create);

export default passwordRouter;
