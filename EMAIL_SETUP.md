# Настройка отправки заказов на Email

## Что изменилось?

Теперь все заказы с вашего сайта отправляются на email вместо Telegram. Это работает как для онлайн-оплаты, так и для оплаты наложенным платежом.

## Выберите способ отправки

### ВАРИАНТ 1: Resend (Самый простой!) ⭐ РЕКОМЕНДУЕТСЯ

**Почему Resend:**

- ✅ Бесплатно до 3000 писем/месяц
- ✅ Настройка за 2 минуты
- ✅ Не нужно двухфакторной аутентификации
- ✅ Современный API

**Настройка:**

1. Зарегистрируйтесь на [Resend.com](https://resend.com/signup)
2. Подтвердите email
3. Создайте API ключ в [API Keys](https://resend.com/api-keys)
4. Скопируйте ключ (начинается с `re_...`)

**Измените код:** В файле `src/app/api/send-email/route.ts` замените функцию `sendEmail`:

```typescript
async function sendEmail(orderData: OrderData): Promise<boolean> {
	try {
		const response = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
			},
			body: JSON.stringify({
				from: 'E-shop Abramova <onboarding@resend.dev>', // Пока используйте этот адрес
				to: process.env.EMAIL_RECIPIENT || 'abramovanataliia8@gmail.com',
				subject: `🛒 Nová objednávka od ${orderData.deliveryForm.name} ${orderData.deliveryForm.surname}`,
				html: `<!-- Весь HTML код остается как был -->`,
			}),
		});

		return response.ok;
	} catch (error) {
		console.error('Ошибка отправки email:', error);
		return false;
	}
}
```

**Обновите .env:**

```env
RESEND_API_KEY=re_ваш_ключ_здесь
EMAIL_RECIPIENT=abramovanataliia8@gmail.com
```

---

### ВАРИАНТ 2: Gmail (требует настройки)

**Настройка Gmail App Password:**

1. Откройте [Google Account](https://myaccount.google.com/)
2. Включите двухфакторную аутентификацию в разделе "Безопасность"
3. Найдите "Пароли приложений" (App Passwords)
4. Создайте пароль для "Почта" → "Другое устройство"
5. Скопируйте 16-значный пароль

**Обновите .env:**

```env
EMAIL_USER=abramovanataliia8@gmail.com
EMAIL_APP_PASSWORD=ваш_app_password_здесь
EMAIL_RECIPIENT=abramovanataliia8@gmail.com
```

Код уже настроен для Gmail, ничего менять не нужно.

---

### ВАРИАНТ 3: SMTP от хостинга (если есть свой сервер)

Если у вас есть хостинг с почтой (например, info@vashdomain.cz):

**Узнайте SMTP настройки** у своего хостинг-провайдера (обычно в панели управления).

**Измените код:** В `src/app/api/send-email/route.ts`:

```typescript
const transporter = nodemailer.createTransport({
	host: 'smtp.vashdomain.cz', // SMTP сервер от хостинга
	port: 587,
	secure: false, // true для порта 465
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});
```

**Обновите .env:**

```env
EMAIL_USER=info@vashdomain.cz
EMAIL_PASSWORD=обычный_пароль
EMAIL_RECIPIENT=abramovanataliia8@gmail.com
```

---

## После настройки любого варианта:

1. **Перезапустите сервер:**

   ```bash
   npm run dev
   ```

2. **Протестируйте:** Оформите тестовый заказ на сайте

## Что получится?

Теперь при каждом заказе вы будете получать красивое HTML-письмо на почту `abramovanataliia8@gmail.com` с полной информацией:

- ✅ Данными покупателя
- ✅ Списком товаров
- ✅ Способом оплаты
- ✅ Итоговой суммой с доставкой

## Проверка работы

1. Откройте сайт и добавьте товар в корзину
2. Оформите заказ (можете выбрать "Dobírka" для теста)
3. Проверьте почту `abramovanataliia8@gmail.com`
4. Должно прийти письмо с темой: **"🛒 Nová objednávka od [Имя покупателя]"**

## Troubleshooting (Решение проблем)

### Письма не приходят

1. Проверьте папку "Спам" в Gmail
2. Убедитесь, что App Password правильно вставлен в `.env` (без ошибок)
3. Убедитесь, что сервер перезапущен после изменения `.env`
4. Проверьте консоль сервера на наличие ошибок

### Ошибка "Invalid login" (Gmail)

- App Password введён неправильно
- Двухфакторная аутентификация не включена
- Используется обычный пароль вместо App Password

### Resend: ошибка 401

- API ключ введён неправильно
- Проверьте, что ключ начинается с `re_`

## Переменные окружения

**Для Resend:**

- `RESEND_API_KEY` - API ключ из Resend
- `EMAIL_RECIPIENT` - адрес получателя заказов

**Для Gmail:**

- `EMAIL_USER` - ваш Gmail адрес
- `Рекомендация

**Для начала используйте Resend** - это самый простой и надёжный вариант. Бесплатного лимита (3000 писем/месяц) более чем достаточно для e-shop.

Позже можете добавить свой домен в Resend и отправлять письма с адреса типа `objednavky@vashdomain.cz` вместо `onboarding@resend.dev`.st: 'smtp.example.com',
port: 587,
secure: false,
auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASSWORD,
},
});

```

```
