import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validation';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.createCategoryZodSchema),
  CategoryController.createCategory
);
/* 
router.get('/', auth(USER_ROLE.ADMIN), CategoryController.getAllCategories);

router.get('/:id', auth(USER_ROLE.ADMIN), CategoryController.getSingleCategory);

router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.updateCategoryZodSchema),
  CategoryController.updateCategory
);

router.delete('/:id', auth(USER_ROLE.ADMIN), CategoryController.deleteCategory);
 */
export const CategoryRoutes = router;