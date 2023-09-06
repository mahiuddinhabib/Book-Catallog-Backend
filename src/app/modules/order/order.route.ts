import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from './order.validate';
import { USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';


const router = express.Router();
// router.get('/', OrderController.getAllFromDB);
// router.get('/:id', OrderController.getByIdFromDB);

router.post(
  '/create-order',
  validateRequest(OrderValidation.createOrderZodSchema),
  auth(USER_ROLE.CUSTOMER),
  OrderController.createOrder
);

export const OrderRoutes = router;
