import { Book, Prisma } from '@prisma/client';
// import httpStatus from 'http-status';
// import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IBookFilterableField } from './book.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import {bookRelationalFields, bookSearchableFields } from './book.constant';

const createBook = async (payload: Book): Promise<Book | null> => {
  const createdBook = await prisma.book.create({
    data: payload,
    include: {
      category: true,
    },
  });
  return createdBook;
};

const getAllBooks = async (
  filters: IBookFilterableField,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, size, skip } = paginationHelpers.calculatePagination(paginationOptions);
  const { search, minPrice, maxPrice, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (bookRelationalFields.includes(key)) {
          return {
            [key]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

    if (minPrice) {
      const minP = parseFloat(minPrice);
      andConditions.push({ price: { gte: minP } });
    }

    if (maxPrice) {
      const maxP = parseFloat(maxPrice);
      andConditions.push({ price: { lte: maxP } });
    }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    include: {
      category:true
    },
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : {
            title: 'asc',
          },
  });
  const total = await prisma.book.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      size,
      total,
    },
    data: result,
  };
};


/* 
const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book | null> => {
  const isExist = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found !');
  }

  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteBook = async (id: string): Promise<Book | null> => {
  const isExist = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};
 */
export const BookService = {
  createBook,
  getAllBooks,
  //   getSingleBook,
  //   updateBook,
  //   deleteBook,
};
