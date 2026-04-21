# Быстрое обновление на сервере для переключения на Email

## Подключитесь к серверу по SSH

```bash
ssh your_user@your_server
```

## Шаг 1: Обновите .env файл на сервере

```bash
cd /var/www/abramova
nano .env
```

**Удалите или закомментируйте строки про Telegram:**

```bash
# TELEGRAM_BOT_TOKEN=...
# TELEGRAM_CHAT_ID=...
```

**Добавьте строки для Resend:**

```bash
# Email настройки для отправки заказов через Resend
RESEND_API_KEY=re_SaGsvBDF_R6QoK9bFEb6idUGQEN18UG4s
EMAIL_RECIPIENT=abramovanataliia8@gmail.com
```

Сохраните (Ctrl+O, Enter, Ctrl+X)

## Шаг 2: Получите обновления с Git

```bash
git pull origin main
# или
git pull origin master
```

## Шаг 3: Запустите скрипт обновления

```bash
chmod +x update.sh  # если еще не сделали
./update.sh
```

Скрипт автоматически:

- Создаст backup БД
- Установит зависимости
- Применит миграции
- Пересоберет проект
- Перезапустит PM2

## Готово! ✅

Теперь заказы пойдут на email `abramovanataliia8@gmail.com`

## Проверка

Посмотрите логи, чтобы убедиться что всё работает:

```bash
pm2 logs abramova --lines 50
```

Если увидите ошибки с Resend API - значит что-то не так с переменными окружения.

---

## Альтернатива: Быстрое обновление одной командой

Если хотите все сделать одной последовательностью команд:

```bash
cd /var/www/abramova && \
git pull && \
npm install && \
npm run build && \
pm2 restart abramova && \
pm2 logs abramova --lines 20
```

(Но .env все равно нужно обновить вручную!)
