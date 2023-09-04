import { Request, RequestHandler, Response } from 'express';
import { Category } from '@prisma/client';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const createCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const category = req.body;
    const result = await CategoryService.createCategory(category);

    sendResponse<Category>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Category created successfully',
      data: result,
    });
  }
);

/* 
const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategory();

  sendResponse<Category[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category retrieved successfully',
    data: result,
  });
});
const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoryService.getSingleCategory(id);

  sendResponse<Category>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category retrieved successfully',
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await CategoryService.updateCategory(id, updatedData);

  sendResponse<Category>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category updated successfully',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoryService.deleteCategory(id);

  sendResponse<Category>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category deleted successfully',
    data: result,
  });
});
 */
export const CategoryController = {
createCategory,
//   getAllCategory,
//   getSingleCategory,
//   updateCategory,
//   deleteCategory,
};
