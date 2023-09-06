import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post(
  '/create-book',
  auth(USER_ROLE.ADMIN),
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
);

router.get('/', BookController.getAllBooks);

/* 
router.get('/:id', BookController.getSingleBook);

router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN),
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBook
);
router.delete('/:id', auth(USER_ROLE.ADMIN), BookController.deleteBook);
*/

export const BookRoutes = router;
