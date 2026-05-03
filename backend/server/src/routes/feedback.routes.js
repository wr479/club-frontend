const { Router } = require("express");
const controller = require("../controllers/feedback.controller");

const router = Router();

/**
 * @swagger
 * /api/feedback:
 *   post:
 *     tags:
 *       - Feedback
 *     summary: Создать заявку обратной связи
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackInput'
 *     responses:
 *       201:
 *         description: Заявка создана
 *       400:
 *         description: Ошибка валидации
 */
router.post("/", controller.createFeedback);

module.exports = router;
