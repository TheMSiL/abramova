-- Исправление категорий товаров для соответствия slug категорий
UPDATE "Product" SET category = 'sklo' WHERE category = 'glass';
UPDATE "Product" SET category = 'dekorativni' WHERE category = 'decorate';
UPDATE "Product" SET category = 'designove' WHERE category = 'design';
