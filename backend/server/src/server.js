require("dotenv").config();
const app = require("./app");
const pool = require("./config/db");

const PORT = Number(process.env.PORT) || 3000;
const { DATABASE_URL } = process.env;

async function start() {
  if (!DATABASE_URL) {
    console.error(
      "DB connection failed: переменная DATABASE_URL не задана. Создайте .env на основе .env.example."
    );
    process.exit(1);
  }

  try {
    await pool.query("SELECT 1;");
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("DB connection failed:", error?.message || error);
    process.exit(1);
  }
}

start();
