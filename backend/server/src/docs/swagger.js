const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Battery Catalog API",
      version: "1.0.0",
      description: "API каталога аккумуляторов и админки.",
    },
    components: {
      schemas: {
        ProductInput: {
          type: "object",
          required: ["title", "brand", "price", "capacity_ah", "voltage_v"],
          properties: {
            title: { type: "string", example: "Varta Blue Dynamic" },
            brand: { type: "string", example: "Varta" },
            price: { type: "number", example: 6900 },
            in_stock: { type: "boolean", example: true },
            capacity_ah: { type: "number", example: 60 },
            voltage_v: { type: "number", example: 12 },
            polarity: { type: "string", example: "reverse" },
            terminal_type: { type: "string", example: "euro" },
            width_mm: { type: "number", example: 175 },
            height_mm: { type: "number", example: 190 },
            length_mm: { type: "number", example: 242 },
            image_url: { type: "string", example: "/uploads/1711000000000-123456789.jpg" },
          },
        },
        FeedbackInput: {
          type: "object",
          required: ["name", "phone"],
          properties: {
            name: { type: "string", example: "Иван" },
            phone: { type: "string", example: "+79990001122" },
            message: { type: "string", example: "Нужен аккумулятор на Kia Rio 2018" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsDoc(options);
