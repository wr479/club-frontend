require("dotenv").config();
const fs = require("fs/promises");
const path = require("path");
const { Client } = require("pg");

async function run() {
  const { DATABASE_URL } = process.env;
  if (!DATABASE_URL) {
    console.error("DB init failed: DATABASE_URL is not set");
    process.exit(1);
  }

  const schemaPath = path.join(__dirname, "..", "db", "schema.sql");
  const schemaSql = await fs.readFile(schemaPath, "utf8");

  const client = new Client({ connectionString: DATABASE_URL });
  await client.connect();

  try {
    await client.query(schemaSql);
    console.log("DB schema initialized successfully");
  } finally {
    await client.end();
  }
}

run().catch((error) => {
  console.error("DB init failed:", error?.message || error);
  process.exit(1);
});
