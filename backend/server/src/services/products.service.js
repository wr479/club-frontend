const pool = require("../config/db");

async function getProducts(filters) {
  const conditions = [];
  const values = [];
  let index = 1;

  if (filters.minPrice !== undefined) {
    conditions.push(`price >= $${index++}`);
    values.push(filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    conditions.push(`price <= $${index++}`);
    values.push(filters.maxPrice);
  }
  if (filters.inStock !== undefined) {
    conditions.push(`in_stock = $${index++}`);
    values.push(filters.inStock);
  }
  if (filters.brand) {
    conditions.push(`brand ILIKE $${index++}`);
    values.push(`%${filters.brand}%`);
  }
  if (filters.voltage !== undefined) {
    conditions.push(`voltage_v = $${index++}`);
    values.push(filters.voltage);
  }
  if (filters.minCapacity !== undefined) {
    conditions.push(`capacity_ah >= $${index++}`);
    values.push(filters.minCapacity);
  }
  if (filters.maxCapacity !== undefined) {
    conditions.push(`capacity_ah <= $${index++}`);
    values.push(filters.maxCapacity);
  }
  if (filters.search) {
    conditions.push(`(
      title ILIKE $${index}
      OR brand ILIKE $${index}
      OR COALESCE(polarity, '') ILIKE $${index}
      OR COALESCE(terminal_type, '') ILIKE $${index}
    )`);
    values.push(`%${filters.search}%`);
    index += 1;
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const orderClause = `ORDER BY ${filters.sortBy} ${filters.sortOrder.toUpperCase()}`;
  const pagination = `LIMIT $${index++} OFFSET $${index++}`;
  values.push(filters.limit, filters.offset);

  const query = `
    SELECT *
    FROM products
    ${whereClause}
    ${orderClause}
    ${pagination};
  `;

  const countQuery = `
    SELECT COUNT(*)::int AS total
    FROM products
    ${whereClause};
  `;

  const countValues = values.slice(0, values.length - 2);

  const [itemsResult, countResult] = await Promise.all([
    pool.query(query, values),
    pool.query(countQuery, countValues),
  ]);

  return {
    items: itemsResult.rows,
    total: countResult.rows[0].total,
    limit: filters.limit,
    offset: filters.offset,
  };
}

async function getProductById(id) {
  const result = await pool.query("SELECT * FROM products WHERE id = $1;", [id]);
  return result.rows[0] || null;
}

module.exports = {
  getProducts,
  getProductById,
};
