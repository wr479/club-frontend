const pool = require("../config/db");

async function listFeedbackRequests() {
  const result = await pool.query(
    `
      SELECT id, name, phone, message, created_at
      FROM feedback_requests
      ORDER BY created_at DESC, id DESC;
    `
  );
  return result.rows;
}

async function createFeedbackRequest(payload) {
  const result = await pool.query(
    `
      INSERT INTO feedback_requests (name, phone, message)
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
    [payload.name, payload.phone, payload.message]
  );

  return result.rows[0];
}

module.exports = {
  listFeedbackRequests,
  createFeedbackRequest,
};
