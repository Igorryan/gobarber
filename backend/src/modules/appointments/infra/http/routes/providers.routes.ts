import { Router } from 'express';
import { celebrate, Joi } from 'celebrate'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providersMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providersDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-availability', celebrate({
  'params': {
    provider_id: Joi.string().uuid().required(),
  },
}), providersMonthAvailabilityController.index);

providersRouter.get('/:provider_id/day-availability', celebrate({
  'params': {
    provider_id: Joi.string().uuid().required(),
  },
}), providersDayAvailabilityController.index);

export default providersRouter;
