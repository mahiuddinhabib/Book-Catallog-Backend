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

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders(req.user);

  sendResponse<Order[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Orders fetched successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
    const {id} = req.params;
  const result = await OrderService.getSingleOrder(req.user, id);

  sendResponse<Order>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order fetched successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder
};
