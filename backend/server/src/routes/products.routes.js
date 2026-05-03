const { Router } = require("express");
const controller = require("../controllers/products.controller");

const router = Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *       - Catalog
 *     summary: Список товаров с фильтрацией
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: inStock
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *       - in: query
 *         name: voltage
 *         schema:
 *           type: number
 *       - in: query
 *         name: minCapacity
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxCapacity
 *         schema:
 *           type: number
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Успешный ответ
 *       400:
 *         description: Ошибка валидации
 */
router.get("/", controller.listProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Catalog
 *     summary: Получить товар по id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Успешный ответ
 *       404:
 *         description: Товар не найден
 */
router.get("/:id", controller.getProduct);

module.exports = router;
