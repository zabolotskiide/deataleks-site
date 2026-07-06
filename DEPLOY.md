# DEPLOY.md — ДЕТАЛЕКС

## Локальный запуск

```bash
npm install
npx prisma generate
npm run dev
```

Локальный сайт: `http://localhost:3000`.
Админка: `http://localhost:3000/admin`.

## Обязательные ENV

Скопируйте `.env.example` в `.env.local` и заполните значения:

```bash
DATABASE_URL="file:./dev.db"
ADMIN_LOGIN="admin"
ADMIN_PASSWORD="change-me"
ADMIN_SESSION_SECRET="change-me-long-random-secret"

SMTP_HOST=""
SMTP_PORT="465"
SMTP_USER=""
SMTP_PASS=""
EMAIL_TO="detaleksparts@gmail.com"

TELEGRAM_BOT_TOKEN=""
TELEGRAM_CHAT_ID=""
MAX_BOT_TOKEN=""
MAX_CHAT_ID=""
MAX_API_URL=""
```

Supplier API переменные (`ROSSKO_*`, `PARTKOM_*`, `FORUM_AUTO_*`, `TRUCKMOTORS_*`) заполнять только после получения официальной документации, endpoint и схемы авторизации.

## База данных

В проекте используется Prisma. Для локального этапа настроен SQLite.

Если локальная база отсутствует, создайте ее:

```bash
npx prisma generate
```

В текущей среде таблицы созданы локально в `prisma/dev.db`.

## Деплой на Vercel

1. Загрузить проект в GitHub.
2. Подключить репозиторий в Vercel.
3. Добавить ENV из `.env.example` в Vercel Project Settings.
4. Для production заменить SQLite на внешнюю БД, например Vercel Postgres/Neon/Supabase, и обновить `DATABASE_URL`.
5. Запустить деплой.

Команда сборки:

```bash
npm run build
```

## Важные ограничения Vercel

- SQLite-файл и `public/uploads` не являются надежным постоянным хранилищем в serverless production.
- Для production-файлов заявок нужен S3/R2/Vercel Blob.
- Для production-базы нужна внешняя PostgreSQL/managed DB.
- Supplier API сейчас оставлены безопасными TODO-адаптерами, потому что документация методов не предоставлена.

## Проверка перед публикацией

```bash
npm run lint
npm run build
```