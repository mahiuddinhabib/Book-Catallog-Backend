"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRelationalFields = exports.bookSearchableFields = exports.bookFilterableFields = void 0;
exports.bookFilterableFields = [
    'minPrice',
    'maxPrice',
    'category',
    'search',
];
exports.bookSearchableFields = ['title', 'author', 'genre'];
exports.bookRelationalFields = [
    'category'
];
