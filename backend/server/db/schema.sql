CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  brand TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  image_url TEXT,
  in_stock BOOLEAN NOT NULL DEFAULT TRUE,
  capacity_ah NUMERIC(8, 2) NOT NULL CHECK (capacity_ah > 0),
  voltage_v NUMERIC(8, 2) NOT NULL CHECK (voltage_v > 0),
  polarity TEXT,
  terminal_type TEXT,
  width_mm NUMERIC(8, 2),
  height_mm NUMERIC(8, 2),
  length_mm NUMERIC(8, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_voltage ON products(voltage_v);
CREATE INDEX IF NOT EXISTS idx_products_capacity ON products(capacity_ah);

ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url TEXT;

CREATE TABLE IF NOT EXISTS feedback_requests (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
