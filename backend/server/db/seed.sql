INSERT INTO products (
  title, brand, price, in_stock, capacity_ah, voltage_v,
  polarity, terminal_type, width_mm, height_mm, length_mm
)
VALUES
  ('Varta Blue Dynamic D24', 'Varta', 8200.00, TRUE, 60.00, 12.00, 'reverse', 'euro', 175.00, 190.00, 242.00),
  ('Bosch S4 005', 'Bosch', 7700.00, TRUE, 60.00, 12.00, 'straight', 'euro', 175.00, 190.00, 242.00),
  ('Mutlu SFB M3', 'Mutlu', 6900.00, FALSE, 55.00, 12.00, 'reverse', 'euro', 175.00, 190.00, 242.00);
