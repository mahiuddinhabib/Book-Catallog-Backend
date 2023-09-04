import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { excludeField } from '../../../helpers/excludeField';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import {
  // ILoginUser,
  ILoginUserResponse,
} from './auth.interface';

const createUser = async (payload: User): Promise<Partial<User> | null> => {
  const createdUser = await prisma.user.create({
    data: payload,
  });
  const userWithoutPassword = excludeField(createdUser, ['password']);
  return userWithoutPassword;
};
const loginUser = async (
  payload: Partial<User>
): Promise<ILoginUserResponse> => {
  const { email: mail, password: pass } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: mail,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (isUserExist.password && !(isUserExist.password === pass)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { id, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { role, userId: id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { role, userId: id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

/* 
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  //Checking if the user is deleted or not
  const { _id } = verifiedToken;

  const isUserExist = await User.findById(_id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      _id: isUserExist._id,
      emial: isUserExist.email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};
 */
export const AuthService = {
  createUser,
  loginUser,
  //   refreshToken,
};
