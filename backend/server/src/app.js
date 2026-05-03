const path = require("path");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const productsRoutes = require("./routes/products.routes");
const adminRoutes = require("./routes/admin.routes");
const feedbackRoutes = require("./routes/feedback.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/products", productsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/feedback", feedbackRoutes);

app.use("/admin", express.static(path.join(__dirname, "..", "public", "admin")));
app.use("/catalog", express.static(path.join(__dirname, "..", "public", "catalog")));
app.use("/uploads", express.static(path.join(__dirname, "..", "public", "uploads")));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use((error, _req, res, _next) => {
  // Общий обработчик ошибок, чтобы API всегда возвращал JSON.
  console.error("Unhandled application error:", error);
  if (error?.name === "MulterError") {
    return res.status(400).json({ message: "Ошибка загрузки файла изображения" });
  }
  const statusCode = Number.isInteger(error?.statusCode) ? error.statusCode : 500;
  const message =
    statusCode >= 500 ? "Внутренняя ошибка сервера" : error?.message || "Ошибка запроса";
  return res.status(statusCode).json({ message });
});

module.exports = app;
