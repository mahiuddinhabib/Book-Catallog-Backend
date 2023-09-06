import express from 'express';
import { USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validate';

const router = express.Router();

router.get('/', auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER), OrderController.getAllOrders);

router.get('/:id', auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER), OrderController.getSingleOrder);

router.post(
  '/create-order',
  validateRequest(OrderValidation.createOrderZodSchema),
  auth(USER_ROLE.CUSTOMER),
  OrderController.createOrder
);

export const OrderRoutes = router;
