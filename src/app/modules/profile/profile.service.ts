import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { excludeField } from "../../../helpers/excludeField";

const getProfile = async (user: JwtPayload|null): Promise<Partial<User> | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id:user?.userId,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const profileWithoutId = excludeField(result, ['id']);
  return profileWithoutId;
};

export const ProfileService = {
    getProfile
}