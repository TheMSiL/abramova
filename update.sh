#!/bin/bash

# Скрипт для быстрого обновления сайта на VPS
# Использование: ./update.sh

echo "🚀 Начинаем обновление Abramova Svíčky..."

# Переход в директорию проекта
cd /var/www/abramova || exit

# Создание резервной копии базы данных
echo "📦 Создание резервной копии БД..."
BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -U postgres abramova > "/var/backups/abramova-${BACKUP_DATE}.sql"

# Обновление кода (если используется git)
# echo "📥 Получение обновлений..."
# git pull origin main

# Установка зависимостей
echo "📦 Установка зависимостей..."
npm install

# Применение миграций базы данных
echo "🗄️ Применение миграций..."
npx prisma migrate deploy

# Генерация Prisma Client
echo "⚙️ Генерация Prisma Client..."
npx prisma generate

# Сборка проекта
echo "🔨 Сборка проекта..."
npm run build

# Перезапуск PM2
echo "🔄 Перезапуск приложения..."
pm2 restart abramova

# Проверка статуса
echo "✅ Статус приложения:"
pm2 status abramova

echo "🎉 Обновление завершено!"
