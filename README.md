# 🕯️ Abramova Svíčky

Ručně vyráběné sójové svíčky z přírodního vosku. E-shop postavený na Next.js 16 s PostgreSQL.

## 🚀 Быстрый старт (локальная разработка)

```bash
# Установите зависимости
npm install

# Настройте .env.local
cp .env.example .env.local
# Отредактируйте DATABASE_URL и другие переменные

# Примените миграции
npx prisma migrate deploy

# Загрузите данные
npm run db:seed

# Запустите dev сервер
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## 📚 Документация

- 📘 **[VPS_DEPLOY_GUIDE.md](VPS_DEPLOY_GUIDE.md)** - Полная инструкция по развертыванию на VPS
- ⚡ **[QUICK_START.md](QUICK_START.md)** - Краткая памятка по развертыванию
- 📦 **[DEPLOY_INSTRUCTIONS.md](DEPLOY_INSTRUCTIONS.md)** - Инструкции по работе с бэкапами
- 🔍 **[SEO_DOCUMENTATION.md](SEO_DOCUMENTATION.md)** - SEO оптимизация и настройка

## 🛠️ Технологии

- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL 18
- **ORM:** Prisma 7
- **Styling:** Tailwind CSS
- **Payments:** Stripe
- **Deployment:** PM2 + Nginx

## 📁 Структура проекта

```
abramova/
├── src/
│   ├── app/              # Next.js App Router страницы
│   │   ├── api/          # API Routes
│   │   ├── admin/        # Админ-панель (защищена паролем)
│   │   ├── e-shop/       # Каталог товаров
│   │   └── ...
│   ├── components/       # React компоненты
│   ├── context/          # React Context (корзина)
│   └── lib/              # Утилиты (Prisma client)
├── prisma/
│   ├── schema.prisma     # Схема базы данных
│   ├── seed.ts           # Данные для заполнения БД
│   └── migrations/       # Миграции
├── public/               # Статические файлы
├── nginx.conf            # Конфиг Nginx для VPS
├── ecosystem.config.json # Конфиг PM2
├── update.sh             # Скрипт обновления на VPS
└── backup.sh             # Скрипт бэкапа БД
```

## 🔐 Админ-панель

- URL: `/admin`
- Логин: Введите пароль из переменной `ADMIN_PASSWORD`
- Функции: Управление товарами, создание/редактирование/удаление

## 🗃️ База данных

### Локальная разработка

```bash
# Создать миграцию
npx prisma migrate dev --name описание_изменений

# Применить миграции (production)
npx prisma migrate deploy

# Открыть Prisma Studio
npx prisma studio

# Пересоздать БД и залить данные
npx prisma migrate reset
```

### Production (VPS)

```bash
# Применить миграции
npx prisma migrate deploy

# Залить начальные данные
npm run db:seed

# Создать бэкап
./backup.sh
```

## 🌐 Переменные окружения

Создайте файл `.env.local`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/abramova"

# Admin
ADMIN_PASSWORD="your_secure_password"

# Telegram
TELEGRAM_BOT_TOKEN="your_token"
TELEGRAM_CHAT_ID="your_chat_id"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
```

## 📦 Скрипты

```bash
npm run dev          # Запуск dev сервера
npm run build        # Сборка для production
npm start            # Запуск production сервера
npm run lint         # Линтинг кода
npm run db:seed      # Заполнение БД данными
```

## 🚀 Развертывание на VPS

1. Загрузите проект через WinSCP в `/var/www/abramova`
2. Следуйте инструкциям в **[VPS_DEPLOY_GUIDE.md](VPS_DEPLOY_GUIDE.md)**
3. Используйте **[QUICK_START.md](QUICK_START.md)** для быстрой справки

### Краткая последовательность:

```bash
cd /var/www/abramova
npm install
# Создайте .env.local с правильными настройками
npx prisma migrate deploy
npm run db:seed
npm run build
pm2 start ecosystem.config.json
pm2 save
```

## 🔄 Обновление сайта на VPS

```bash
./update.sh
```

Или вручную:

```bash
cd /var/www/abramova
# Загрузите новые файлы через WinSCP
npm install
npm run build
pm2 restart abramova
```

## 🔒 SEO

- ✅ Meta tags настроены
- ✅ Open Graph для соцсетей
- ✅ Sitemap.xml (динамический)
- ✅ Robots.txt
- ✅ JSON-LD структурированные данные

**После деплоя:** Замените домен в файлах SEO. См. [SEO_DOCUMENTATION.md](SEO_DOCUMENTATION.md)

## 📊 Мониторинг

```bash
# Статус приложения
pm2 status

# Логи приложения
pm2 logs abramova

# Логи Nginx
sudo tail -f /var/log/nginx/abramova-error.log

# Мониторинг ресурсов
pm2 monit
```

## 🆘 Поддержка

Если возникли проблемы при развертывании:

1. Проверьте логи: `pm2 logs abramova`
2. Проверьте Nginx: `sudo nginx -t`
3. Проверьте БД: `sudo systemctl status postgresql`
4. См. раздел "Решение проблем" в [VPS_DEPLOY_GUIDE.md](VPS_DEPLOY_GUIDE.md)

## 📝 Лицензия

Частный проект - Natália Abramova © 2026

## 🌟 Возможности

- ✅ Каталог товаров с категориями
- ✅ Корзина покупок
- ✅ Интеграция Stripe для оплаты
- ✅ Админ-панель для управления товарами
- ✅ Защита админки паролем
- ✅ Адаптивный дизайн
- ✅ SEO оптимизация
- ✅ Уведомления в Telegram
- ✅ Загрузка изображений
- ✅ Поиск товаров
- ✅ Фильтрация по категориям

---

**Дата создания:** Март 2026  
**Next.js:** 16.1.6  
**Node.js:** 18+  
**PostgreSQL:** 18
