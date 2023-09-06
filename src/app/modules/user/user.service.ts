/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const getAllUsers = async (): Promise<User[] | []> => {
  const result = await prisma.user.findMany();
  return result;
};

const getSingleUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where:{
        id
    }
  })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const isExist = await prisma.user.findUnique({
    where:{
        id
    }
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  const result = await prisma.user.update({
    where:{
        id
    },
    data:payload
  })
  return result;
};

const deleteUser = async (id: string): Promise<User | null> => {
  const isExist = await prisma.user.findUnique({
    where:{
        id
    }
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await prisma.user.delete({
    where:{
        id
    }
  });
  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
