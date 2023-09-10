# Book Catalog Backend

## Live Link: https://example.com

### Application Routes:

User
- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/15893736-3ad7-4041-9155-8d67f4bfd406 (Single GET)
- api/v1/users/15893736-3ad7-4041-9155-8d67f4bfd406 (PATCH)
- api/v1/users/15893736-3ad7-4041-9155-8d67f4bfd406 (DELETE)
- api/v1/profile (GET)

Category
- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/f2d1163b-8d79-4d65-83fe-f0705e9951ea (Single GET)
- api/v1/categories/f2d1163b-8d79-4d65-83fe-f0705e9951ea (PATCH)
- api/v1/categories/f2d1163b-8d79-4d65-83fe-f0705e9951ea (DELETE)
Books
- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/:categoryId/category (GET)
- api/v1/books/:id (GET)
- api/v1/books/:id (PATCH)
- api/v1/books/:id (DELETE)
Orders
- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/:orderId (GET)