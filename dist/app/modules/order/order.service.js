"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const utils_1 = require("../../../shared/utils");
const createOrder = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(user);
    const newOrder = yield prisma_1.default.$transaction((trx) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield trx.order.create({
            data: {
                userId: user === null || user === void 0 ? void 0 : user.userId,
            },
        });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to create order');
        }
        yield (0, utils_1.asyncForEach)(data, (orderData) => __awaiter(void 0, void 0, void 0, function* () {
            yield trx.orderedBook.create({
                data: {
                    orderId: result.id,
                    bookId: orderData.bookId,
                    quantity: orderData.quantity,
                },
            });
        }));
        return result;
    }));
    if (newOrder) {
        const responseData = yield prisma_1.default.order.findUnique({
            where: {
                id: newOrder.id,
            },
            include: {
                orderedBooks: {
                    select: {
                        bookId: true,
                        quantity: true,
                    },
                },
            },
        });
        return responseData;
    }
    throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to create order');
});
const getAllOrders = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let orders;
    if ((user === null || user === void 0 ? void 0 : user.role) === user_1.USER_ROLE.ADMIN) {
        orders = yield prisma_1.default.order.findMany({
            include: {
                orderedBooks: true,
            },
        });
    }
    else {
        orders = yield prisma_1.default.order.findMany({
            where: {
                userId: {
                    equals: user === null || user === void 0 ? void 0 : user.userId,
                },
            },
            include: {
                orderedBooks: true,
            },
        });
    }
    return orders;
});
const getSingleOrder = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield prisma_1.default.order.findUnique({
        where: {
            id,
        },
        include: {
            orderedBooks: true,
        },
    });
    if ((user === null || user === void 0 ? void 0 : user.role) === user_1.USER_ROLE.ADMIN ||
        ((user === null || user === void 0 ? void 0 : user.role) === user_1.USER_ROLE.CUSTOMER && (user === null || user === void 0 ? void 0 : user.userId) === (order === null || order === void 0 ? void 0 : order.userId))) {
        return order;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden');
    }
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getSingleOrder,
};
