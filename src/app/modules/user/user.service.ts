/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@prisma/client';
// import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
// import { Secret } from 'jsonwebtoken';
// import config from '../../../config';
import ApiError from '../../../errors/ApiError';
// import { jwtHelpers } from '../../../helpers/jwtHelpers';
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
/* 
const getMyProfile = async (token: string): Promise<User | null> => {
  const verifiedUser = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );
  const result = await User.findById(verifiedUser._id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return result;
};

const updateMyProfile = async (
  token: string,
  payload: Partial<User>
): Promise<User | null> => {
  const verifiedUser = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );

  const isExist = await User.findOne({ _id: verifiedUser._id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  const { name, password, ...userData } = payload;

  const updatedUserData: Partial<User> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<User>; // `name.firstName`
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds)
    );
    updatedUserData.password = hashedPassword;
  }

  const result = await User.findOneAndUpdate(
    { _id: verifiedUser._id },
    updatedUserData,
    {
      new: true,
    }
  );
  return result;
};
 */
export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
//   getMyProfile,
//   updateMyProfile,
};
