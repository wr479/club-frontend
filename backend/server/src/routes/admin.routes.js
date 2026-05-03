const { Router } = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const controller = require("../controllers/admin.controller");
const { ValidationError } = require("../utils/errors");

const router = Router();
const uploadsDir = path.join(__dirname, "..", "..", "public", "uploads");
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg";
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext.toLowerCase()}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new ValidationError("Разрешены только файлы изображений"));
      return;
    }
    cb(null, true);
  },
});

/**
 * @swagger
 * /api/admin/products:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Список товаров для админки
 *     responses:
 *       200:
 *         description: Успешный ответ
 */
router.get("/products", controller.listProducts);

/**
 * @swagger
 * /api/admin/feedback:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Список заявок обратной связи для админки
 *     responses:
 *       200:
 *         description: Успешный ответ
 */
router.get("/feedback", controller.listFeedbackRequests);

/**
 * @swagger
 * /api/admin/products:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Создать товар
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Товар создан
 *       400:
 *         description: Ошибка валидации
 */
router.post("/products", controller.createProduct);

/**
 * @swagger
 * /api/admin/products/upload-image:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Загрузить изображение товара
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [image]
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Изображение загружено
 *       400:
 *         description: Ошибка валидации
 */
router.post("/products/upload-image", upload.single("image"), controller.uploadProductImage);

/**
 * @swagger
 * /api/admin/products/{id}:
 *   put:
 *     tags:
 *       - Admin
 *     summary: Обновить товар
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Товар обновлен
 *       404:
 *         description: Товар не найден
 */
router.put("/products/:id", controller.updateProduct);

/**
 * @swagger
 * /api/admin/products/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Удалить товар
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Товар удален
 *       404:
 *         description: Товар не найден
 */
router.delete("/products/:id", controller.removeProduct);

module.exports = router;
