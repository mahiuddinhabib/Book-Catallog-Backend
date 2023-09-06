import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { IOrderCreateData } from './order.interface';
const createOrder = async (
  user: JwtPayload | null,
  data: IOrderCreateData[]
): Promise<Order | null> => {
  //   console.log(user);

  const newOrder = await prisma.$transaction(async trx => {
    const result = await trx.order.create({
      data: {
        userId: user?.userId,
      },
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create order');
    }

    await asyncForEach(data, async (orderData: IOrderCreateData) => {
      await trx.orderedBook.create({
        data: {
          orderId: result.id,
          bookId: orderData.bookId,
          quantity: orderData.quantity,
        },
      });
    });

    return result;
  });

  if (newOrder) {
    const responseData = await prisma.order.findUnique({
      where: {
        id: newOrder.id,
      },
      include: {
        orderedBooks: {
          select: {
            bookId: true,
            quantity: true,
          },
        },
      },
    });

    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create order');
};

export const OrderService = {
  createOrder,
};
