# Каталог аккумуляторов (Backend + Native UI)

Проект на `Node.js + Express + PostgreSQL` с:
- публичным каталогом товаров,
- фильтрацией по цене и статусу,
- нативной админкой (CRUD),
- Swagger-документацией API.

## 1) Требования

- `Node.js` 18+
- `PostgreSQL` 13+ (локально) **или** `Docker + docker-compose`

## 2) Установка

```bash
npm install
```

## 3) Настройка окружения

Создайте `.env` в корне проекта (можно скопировать из `.env.example`):

```env
PORT=3000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/battery_catalog
```

Если `DATABASE_URL` не задан, сервер завершится с ошибкой.

---

## 4) Полный запуск в Docker (рекомендуется)

Запуск всего стека (PostgreSQL + Node.js API):

```bash
docker-compose up --build -d
docker-compose ps
```

Будут подняты контейнеры:
- `battery_catalog_postgres`
- `battery_catalog_server`

Что происходит автоматически:
- PostgreSQL инициализирует схему из `db/schema.sql` при первом старте пустого тома.
- Контейнер `server` при старте выполняет `npm run build` (внутри это `db:init`), затем `npm start`.

Логи приложения:

```bash
docker-compose logs -f server
```

---

## 5) Локальный запуск без Docker

1. Поднимите локальный PostgreSQL и создайте БД `battery_catalog`.
2. Примените SQL-скрипты:
   - `db/schema.sql` — структура таблиц и индексы.
   - `db/seed.sql` — тестовые данные (опционально).
3. Запустите сервер:

```bash
npm run dev
```

---

## 6) Проверка, что все работает

- Healthcheck: [http://localhost:3000/health](http://localhost:3000/health) -> `{"status":"ok"}`
- Админка: [http://localhost:3000/admin](http://localhost:3000/admin)
- Swagger UI: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- Каталог: [http://localhost:3000/catalog](http://localhost:3000/catalog)

## 7) Частые проблемы

### `Внутренняя ошибка сервера` в админке сразу после запуска Docker

Проверьте логи контейнера сервера:

```bash
docker-compose logs server
```

Если нужно пересоздать БД с нуля и заново прогнать init-скрипты:

```bash
docker-compose down -v
docker-compose up --build -d
```

### Ошибка подключения к БД при старте сервера

Проверьте:
- что `DATABASE_URL` задан в `.env`;
- что PostgreSQL доступен по `localhost:5432`;
- что база `battery_catalog` существует.

## 8) Команды проекта

```bash
npm run build
npm run db:init
npm run dev
npm start
npm run lint
```

`npm run build` автоматически запускает инициализацию схемы БД (`db/schema.sql`) через `DATABASE_URL`.
В Docker эта команда выполняется автоматически при старте контейнера `server`.

## 9) Основные URL

- Каталог: [http://localhost:3000/catalog](http://localhost:3000/catalog)
- Админка: [http://localhost:3000/admin](http://localhost:3000/admin)
- Swagger UI: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- Healthcheck: [http://localhost:3000/health](http://localhost:3000/health)

## 10) Структура проекта

- `src/server.js` — старт приложения и проверка подключения к БД.
- `src/app.js` — express middlewares, роуты, статика.
- `src/config/db.js` — `pg.Pool`.
- `src/routes` — маршруты API.
- `src/controllers` — обработчики HTTP.
- `src/services` — SQL-логика.
- `src/utils/queryValidation.js` — валидация query/body.
- `src/docs/swagger.js` — OpenAPI-конфиг.
- `public/admin` — нативная админка.
- `public/catalog` — страница каталога.
- `db/schema.sql`, `db/seed.sql` — SQL-скрипты.

## 11) API (кратко)

### Публичный каталог

- `GET /api/products` — список товаров с фильтрацией и пагинацией.
- `GET /api/products/:id` — карточка товара.

Query-параметры `GET /api/products`:

- `minPrice` — минимальная цена.
- `maxPrice` — максимальная цена.
- `inStock` — `true` (в наличии) / `false` (под заказ).
- `brand` — фильтр по бренду.
- `search` — текстовый поиск по названию/бренду/части характеристик.
- `sortBy` — `price | capacity_ah | voltage_v | created_at | title`.
- `sortOrder` — `asc | desc`.
- `limit` — 1..100.
- `offset` — от 0.

Пример:

```http
GET /api/products?minPrice=3000&maxPrice=9000&inStock=true&limit=20&offset=0
```

### Админка (CRUD)

- `GET /api/admin/products` — список товаров.
- `POST /api/admin/products` — создать товар.
- `PUT /api/admin/products/:id` — обновить товар.
- `DELETE /api/admin/products/:id` — удалить товар.

Пример тела (`POST`/`PUT`):

```json
{
  "title": "Varta Blue Dynamic D24",
  "brand": "Varta",
  "price": 8200,
  "in_stock": true,
  "capacity_ah": 60,
  "voltage_v": 12,
  "polarity": "reverse",
  "terminal_type": "euro",
  "width_mm": 175,
  "height_mm": 190,
  "length_mm": 242
}
```

## 12) Swagger

Полная интерактивная документация:
- [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

Источник схемы:
- `src/docs/swagger.js`
- JSDoc-аннотации в `src/routes/products.routes.js` и `src/routes/admin.routes.js`
