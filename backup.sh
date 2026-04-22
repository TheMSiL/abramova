#!/bin/bash

# Скрипт автоматического резервного копирования базы данных
# Добавьте в crontab: 0 2 * * * /var/www/abramova/backup.sh

# Загрузить переменные окружения
source .env 2>/dev/null || export DATABASE_URL="postgresql://abramova_user:ch113430@localhost:5432/abramova"

# Настройки
DB_NAME="abramova"
DB_USER="abramova_user"
PGPASSWORD="ch113430"
BACKUP_DIR="/var/backups/abramova"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/abramova-${DATE}.sql"

# Создать директорию если не существует
mkdir -p "$BACKUP_DIR"

# Создать резервную копию
echo "Создание резервной копии базы данных..."
export PGPASSWORD
pg_dump -U "$DB_USER" -h localhost "$DB_NAME" > "$BACKUP_FILE"

# Сжать резервную копию
gzip "$BACKUP_FILE"

# Удалить резервные копии старше 30 дней
find "$BACKUP_DIR" -name "abramova-*.sql.gz" -mtime +30 -delete

echo "Резервная копия создана: ${BACKUP_FILE}.gz"
