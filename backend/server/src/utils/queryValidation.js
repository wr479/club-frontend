const { ValidationError } = require("./errors");

function parseNumber(value, name) {
  if (value === undefined) {
    return undefined;
  }

  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new ValidationError(`Параметр ${name} должен быть числом`);
  }

  return parsed;
}

function parseBoolean(value, name) {
  if (value === undefined) {
    return undefined;
  }

  if (value === "true" || value === true) {
    return true;
  }

  if (value === "false" || value === false) {
    return false;
  }

  throw new ValidationError(`Параметр ${name} должен быть true или false`);
}

function parseProductBoolean(value, name) {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true") {
      return true;
    }
    if (normalized === "false") {
      return false;
    }
  }

  throw new ValidationError(`Поле ${name} должно быть true или false`);
}

function ensurePositive(value, name, allowZero = false) {
  const isValid = allowZero ? value >= 0 : value > 0;
  if (!isValid) {
    const rule = allowZero ? ">= 0" : "> 0";
    throw new ValidationError(`Поле ${name} должно быть ${rule}`);
  }
}

function ensureMaxNumeric(value, name, maxValue) {
  if (Math.abs(value) >= maxValue) {
    throw new ValidationError(`Поле ${name} должно быть меньше ${maxValue}`);
  }
}

function ensureMaxLength(value, name, max) {
  if (value !== null && value.length > max) {
    throw new ValidationError(`Поле ${name} должно быть не длиннее ${max} символов`);
  }
}

function validateListQuery(query) {
  const minPrice = parseNumber(query.minPrice, "minPrice");
  const maxPrice = parseNumber(query.maxPrice, "maxPrice");
  const minCapacity = parseNumber(query.minCapacity, "minCapacity");
  const maxCapacity = parseNumber(query.maxCapacity, "maxCapacity");
  const voltage = parseNumber(query.voltage, "voltage");
  const inStock = parseBoolean(query.inStock, "inStock");
  const limit = parseNumber(query.limit, "limit") ?? 20;
  const offset = parseNumber(query.offset, "offset") ?? 0;
  const sortBy = query.sortBy || "created_at";
  const sortOrder = (query.sortOrder || "desc").toLowerCase();
  const brand = query.brand;
  const search = query.search ? String(query.search).trim() : undefined;

  const allowedSortBy = ["price", "capacity_ah", "voltage_v", "created_at", "title"];
  if (!allowedSortBy.includes(sortBy)) {
    throw new ValidationError(
      `Параметр sortBy должен быть одним из: ${allowedSortBy.join(", ")}`
    );
  }

  if (!["asc", "desc"].includes(sortOrder)) {
    throw new ValidationError("Параметр sortOrder должен быть asc или desc");
  }

  if (limit < 1 || limit > 100) {
    throw new ValidationError("Параметр limit должен быть от 1 до 100");
  }

  if (offset < 0) {
    throw new ValidationError("Параметр offset должен быть >= 0");
  }

  return {
    minPrice,
    maxPrice,
    minCapacity,
    maxCapacity,
    voltage,
    inStock,
    limit,
    offset,
    sortBy,
    sortOrder,
    brand,
    search,
  };
}

function validateProductPayload(body) {
  const requiredFields = ["title", "brand", "price", "capacity_ah", "voltage_v"];
  for (const field of requiredFields) {
    if (body[field] === undefined || body[field] === null || body[field] === "") {
      throw new ValidationError(`Поле ${field} обязательно`);
    }
  }

  const product = {
    title: String(body.title),
    brand: String(body.brand),
    price: Number(body.price),
    in_stock: body.in_stock === undefined ? true : parseProductBoolean(body.in_stock, "in_stock"),
    capacity_ah: Number(body.capacity_ah),
    voltage_v: Number(body.voltage_v),
    polarity: body.polarity ? String(body.polarity) : null,
    terminal_type: body.terminal_type ? String(body.terminal_type) : null,
    width_mm: body.width_mm === undefined ? null : Number(body.width_mm),
    height_mm: body.height_mm === undefined ? null : Number(body.height_mm),
    length_mm: body.length_mm === undefined ? null : Number(body.length_mm),
    image_url: body.image_url ? String(body.image_url).trim() : null,
  };

  const numberFields = [
    "price",
    "capacity_ah",
    "voltage_v",
    "width_mm",
    "height_mm",
    "length_mm",
  ];

  for (const field of numberFields) {
    if (product[field] !== null && Number.isNaN(product[field])) {
      throw new ValidationError(`Поле ${field} должно быть числом`);
    }
  }

  ensurePositive(product.price, "price", true);
  ensurePositive(product.capacity_ah, "capacity_ah");
  ensurePositive(product.voltage_v, "voltage_v");

  // Match DB limits to avoid NUMERIC overflow (PostgreSQL code 22003).
  ensureMaxNumeric(product.price, "price", 100000000); // NUMERIC(10,2)
  ensureMaxNumeric(product.capacity_ah, "capacity_ah", 1000000); // NUMERIC(8,2)
  ensureMaxNumeric(product.voltage_v, "voltage_v", 1000000); // NUMERIC(8,2)

  if (product.width_mm !== null) {
    ensurePositive(product.width_mm, "width_mm");
    ensureMaxNumeric(product.width_mm, "width_mm", 1000000); // NUMERIC(8,2)
  }
  if (product.height_mm !== null) {
    ensurePositive(product.height_mm, "height_mm");
    ensureMaxNumeric(product.height_mm, "height_mm", 1000000); // NUMERIC(8,2)
  }
  if (product.length_mm !== null) {
    ensurePositive(product.length_mm, "length_mm");
    ensureMaxNumeric(product.length_mm, "length_mm", 1000000); // NUMERIC(8,2)
  }
  ensureMaxLength(product.title, "title", 255);
  ensureMaxLength(product.brand, "brand", 255);
  if (product.polarity !== null) {
    ensureMaxLength(product.polarity, "polarity", 255);
  }
  if (product.terminal_type !== null) {
    ensureMaxLength(product.terminal_type, "terminal_type", 255);
  }
  if (product.image_url !== null) {
    ensureMaxLength(product.image_url, "image_url", 2048);
  }

  return product;
}

function validateFeedbackPayload(body) {
  const payload = {
    name: body.name ? String(body.name).trim() : "",
    phone: body.phone ? String(body.phone).trim() : "",
    message: body.message ? String(body.message).trim() : null,
  };

  if (!payload.name) {
    throw new ValidationError("Поле name обязательно");
  }
  if (!payload.phone) {
    throw new ValidationError("Поле phone обязательно");
  }

  ensureMaxLength(payload.name, "name", 255);
  ensureMaxLength(payload.phone, "phone", 64);
  if (payload.message !== null) {
    ensureMaxLength(payload.message, "message", 2000);
  }

  return payload;
}

module.exports = {
  validateListQuery,
  validateProductPayload,
  validateFeedbackPayload,
};
