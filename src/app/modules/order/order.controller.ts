import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';
import { Order } from '@prisma/client';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.user);
  const result = await OrderService.createOrder(
    req.user,
    req.body?.orderedBooks
  );
  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
};
