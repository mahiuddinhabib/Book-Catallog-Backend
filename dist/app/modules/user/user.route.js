"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
/*
router.get(
  '/my-profile',
  auth(USER_ROLE.BUYER, USER_ROLE.SELLER),
  UserController.getMyProfile
);

router.patch(
  '/my-profile',
  auth(USER_ROLE.BUYER, USER_ROLE.SELLER),
  UserController.updateMyProfile
);
 */
router.get('/:id', (0, auth_1.default)(user_1.USER_ROLE.ADMIN), user_controller_1.UserController.getSingleUser);
router.patch('/:id', (0, auth_1.default)(user_1.USER_ROLE.ADMIN), (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUserZodSchema), user_controller_1.UserController.updateUser);
router.delete('/:id', (0, auth_1.default)(user_1.USER_ROLE.ADMIN), user_controller_1.UserController.deleteUser);
router.get('/', (0, auth_1.default)(user_1.USER_ROLE.ADMIN), user_controller_1.UserController.getAllUsers);
exports.UserRoutes = router;
