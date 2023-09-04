import { Category } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createCategory = async (payload: Category): Promise<Category | null> => {
  const createdCategory = await prisma.category.create({
    data: payload,
  });
  return createdCategory;
};

export const CategoryService = {
    createCategory
}