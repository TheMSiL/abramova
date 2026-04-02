#!/bin/bash

echo "=== Диагностика HTTPS ==="
echo ""

echo "1. Проверка порта 443 (должен быть открыт):"
sudo netstat -tlnp | grep :443
echo ""

echo "2. Статус Nginx:"
sudo systemctl status nginx --no-pager
echo ""

echo "3. Проверка файрволла:"
sudo ufw status
echo ""

echo "4. Проверка сертификатов Let's Encrypt:"
sudo ls -la /etc/letsencrypt/live/candlesabramova.cz/
echo ""

echo "5. Проверка DNS (IP должен совпадать с IP VPS):"
nslookup candlesabramova.cz
echo ""

echo "6. Последние ошибки Nginx:"
sudo tail -20 /var/log/nginx/error.log
echo ""

echo "7. Тест конфигурации Nginx:"
sudo nginx -t
echo ""

echo "=== Если порт 443 закрыт, выполните: ==="
echo "sudo ufw allow 443/tcp"
echo "sudo ufw reload"
echo ""

echo "=== Если сертификатов нет или устарели: ==="
echo "sudo certbot --nginx -d candlesabramova.cz -d www.candlesabramova.cz"
echo ""

echo "=== Перезапуск Nginx: ==="
echo "sudo systemctl restart nginx"



sudo apt update
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d candlesabramova.cz -d www.candlesabramova.cz