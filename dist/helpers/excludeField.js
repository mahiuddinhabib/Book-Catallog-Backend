"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeField = void 0;
function excludeField(user, keys) {
    return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)));
}
exports.excludeField = excludeField;
