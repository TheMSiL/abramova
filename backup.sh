#!/bin/bash

# Скрипт автоматического резервного копирования базы данных
# Добавьте в crontab: 0 2 * * * /var/www/abramova/backup.sh

# Настройки
DB_NAME="abramova"
DB_USER="postgres"
BACKUP_DIR="/var/backups/abramova"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/abramova-${DATE}.sql"

# Создать директорию если не существует
mkdir -p "$BACKUP_DIR"

# Создать резервную копию
echo "Создание резервной копии базы данных..."
pg_dump -U "$DB_USER" "$DB_NAME" > "$BACKUP_FILE"

# Сжать резервную копию
gzip "$BACKUP_FILE"

# Удалить резервные копии старше 30 дней
find "$BACKUP_DIR" -name "abramova-*.sql.gz" -mtime +30 -delete

echo "Резервная копия создана: ${BACKUP_FILE}.gz"
