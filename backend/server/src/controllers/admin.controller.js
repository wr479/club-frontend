const { validateProductPayload } = require("../utils/queryValidation");
const { ValidationError } = require("../utils/errors");
const adminService = require("../services/admin.service");
const feedbackService = require("../services/feedback.service");

async function listProducts(_req, res, next) {
  try {
    const items = await adminService.listAdminProducts();
    return res.json(items);
  } catch (error) {
    return next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const payload = validateProductPayload(req.body);
    const item = await adminService.createProduct(payload);
    return res.status(201).json(item);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    return next(error);
  }
}

async function updateProduct(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "Некорректный id" });
  }

  try {
    const payload = validateProductPayload(req.body);
    const item = await adminService.updateProduct(id, payload);
    if (!item) {
      return res.status(404).json({ message: "Товар не найден" });
    }
    return res.json(item);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    return next(error);
  }
}

async function removeProduct(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "Некорректный id" });
  }

  try {
    const result = await adminService.deleteProduct(id);
    if (!result) {
      return res.status(404).json({ message: "Товар не найден" });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

function uploadProductImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "Файл изображения обязателен" });
  }

  return res.status(201).json({
    image_url: `/uploads/${req.file.filename}`,
  });
}

async function listFeedbackRequests(_req, res, next) {
  try {
    const items = await feedbackService.listFeedbackRequests();
    return res.json(items);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listProducts,
  listFeedbackRequests,
  createProduct,
  updateProduct,
  removeProduct,
  uploadProductImage,
};
