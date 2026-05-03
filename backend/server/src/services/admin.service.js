const pool = require("../config/db");

async function listAdminProducts() {
  const result = await pool.query(
    "SELECT * FROM products ORDER BY created_at DESC, id DESC;"
  );
  return result.rows;
}

async function createProduct(product) {
  const query = `
    INSERT INTO products (
      title, brand, price, in_stock, capacity_ah, voltage_v,
      polarity, terminal_type, width_mm, height_mm, length_mm, image_url
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
    RETURNING *;
  `;
  const values = [
    product.title,
    product.brand,
    product.price,
    product.in_stock,
    product.capacity_ah,
    product.voltage_v,
    product.polarity,
    product.terminal_type,
    product.width_mm,
    product.height_mm,
    product.length_mm,
    product.image_url,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

async function updateProduct(id, product) {
  const query = `
    UPDATE products
    SET
      title = $1,
      brand = $2,
      price = $3,
      in_stock = $4,
      capacity_ah = $5,
      voltage_v = $6,
      polarity = $7,
      terminal_type = $8,
      width_mm = $9,
      height_mm = $10,
      length_mm = $11,
      image_url = $12,
      updated_at = NOW()
    WHERE id = $13
    RETURNING *;
  `;
  const values = [
    product.title,
    product.brand,
    product.price,
    product.in_stock,
    product.capacity_ah,
    product.voltage_v,
    product.polarity,
    product.terminal_type,
    product.width_mm,
    product.height_mm,
    product.length_mm,
    product.image_url,
    id,
  ];

  const result = await pool.query(query, values);
  return result.rows[0] || null;
}

async function deleteProduct(id) {
  const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING id;", [id]);
  return result.rows[0] || null;
}

module.exports = {
  listAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
