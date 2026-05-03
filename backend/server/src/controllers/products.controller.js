const { validateListQuery } = require("../utils/queryValidation");
const { ValidationError } = require("../utils/errors");
const productsService = require("../services/products.service");

async function listProducts(req, res, next) {
  try {
    const filters = validateListQuery(req.query);
    const data = await productsService.getProducts(filters);
    return res.json(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    return next(error);
  }
}

async function getProduct(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "Некорректный id" });
  }

  const item = await productsService.getProductById(id);
  if (!item) {
    return res.status(404).json({ message: "Товар не найден" });
  }

  return res.json(item);
}

module.exports = {
  listProducts,
  getProduct,
};
