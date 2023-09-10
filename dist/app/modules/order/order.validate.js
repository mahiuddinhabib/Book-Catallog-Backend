"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const createOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        orderedBooks: zod_1.z.array(zod_1.z.object({
            bookId: zod_1.z.string({
                required_error: 'book Id is required',
            }),
            quantity: zod_1.z.number({
                required_error: 'quantity is required',
            }),
        })),
    }),
});
exports.OrderValidation = {
    createOrderZodSchema
};
