/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { excludeField } from '../../../helpers/excludeField';
import prisma from '../../../shared/prisma';

const getAllUsers = async (): Promise<Partial<User>[] | []> => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return result;
};

const getSingleUser = async (id: string): Promise<Partial<User> | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const resultWithoutPass = excludeField(result, ['password']);
  return resultWithoutPass;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<Partial<User> | null> => {
  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  const resultWithoutPass = excludeField(result, ['password']);
  return resultWithoutPass;
};

const deleteUser = async (id: string): Promise<Partial<User> | null> => {
  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  const resultWithoutPass = excludeField(result, ['password']);
  return resultWithoutPass;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
