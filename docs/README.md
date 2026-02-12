# ВТ-Резерв — Документация

## Архитектура

```
vt-reserve/
├── docker-compose.yml          # PostgreSQL 16
├── prisma/
│   ├── schema.prisma           # Модели: User, Lead, Settings
│   └── seed.ts                 # Начальные данные (admin/admin123)
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── login/page.tsx  # Страница авторизации
│   │   │   └── page.tsx        # Админ-панель (дашборд, заявки, настройки)
│   │   ├── api/
│   │   │   ├── auth/           # POST /login, POST /logout, GET /me
│   │   │   ├── leads/          # POST (публичный), GET, PATCH, DELETE
│   │   │   ├── stats/          # GET — статистика для дашборда
│   │   │   └── settings/       # GET, POST — настройки SMTP
│   │   └── page.tsx            # Главная страница сайта
│   ├── components/             # Компоненты сайта
│   └── lib/
│       ├── prisma.ts           # Singleton Prisma Client
│       ├── auth.ts             # JWT авторизация (jose)
│       └── mail.ts             # Отправка email (nodemailer)
└── .env                        # Переменные окружения
```

## Быстрый старт

### 1. Запуск PostgreSQL

```bash
docker-compose up -d
```

### 2. Установка зависимостей

```bash
bun install
```

### 3. Применение схемы БД

```bash
bun run db:push
```

### 4. Заполнение начальными данными

```bash
bun run db:seed
```

Создаст:
- Админ-пользователя: **admin** / **admin123**
- Настройки SMTP по умолчанию

### 5. Запуск dev-сервера

```bash
bun run dev
```

- Сайт: http://localhost:3000
- Админка: http://localhost:3000/admin

---

## Админ-панель

### Вход
- URL: `/admin/login`
- Логин: `admin`
- Пароль: `admin123`

### Дашборд (`/admin` → вкладка «Дашборд»)
- Карточки: всего заявок, новые, в работе, завершены
- Статистика за сегодня / неделю / месяц
- График заявок за 30 дней
- Последние 5 заявок

### Заявки (`/admin` → вкладка «Заявки»)
- Список заявок с пагинацией
- Поиск по имени, email, телефону, сообщению
- Фильтрация по статусу (Новая, В работе, Завершена, Отклонена)
- Детальная карточка заявки с возможностью:
  - Смены статуса
  - Добавления заметки
  - Удаления заявки
- Реактивное обновление при действиях

### Настройки (`/admin` → вкладка «Настройки»)
- Email для уведомлений
- SMTP конфигурация (хост, порт, логин, пароль, отправитель)

---

## Email-уведомления

При поступлении новой заявки с сайта на указанный в настройках email автоматически отправляется красиво оформленное письмо с данными заявки.

### Настройка Gmail SMTP

1. Откройте https://myaccount.google.com/apppasswords
2. Создайте пароль для приложения
3. В настройках админки укажите:
   - **Хост:** `smtp.gmail.com`
   - **Порт:** `587`
   - **Логин:** ваш Gmail
   - **Пароль:** App Password (16 символов)
   - **Email для уведомлений:** куда отправлять

### Настройка Яндекс SMTP

- **Хост:** `smtp.yandex.ru`
- **Порт:** `465`
- **Логин:** ваш Яндекс email
- **Пароль:** пароль приложения

---

## API

### Публичные

| Метод | URL | Описание |
|-------|-----|----------|
| POST | `/api/leads` | Создание заявки с сайта |

**Body:** `{ name, email, phone?, message? }`

### Защищённые (требуют JWT cookie)

| Метод | URL | Описание |
|-------|-----|----------|
| POST | `/api/auth/login` | Авторизация |
| POST | `/api/auth/logout` | Выход |
| GET | `/api/auth/me` | Текущий пользователь |
| GET | `/api/leads` | Список заявок (пагинация, поиск, фильтр) |
| PATCH | `/api/leads/:id` | Обновление статуса/заметки |
| DELETE | `/api/leads/:id` | Удаление заявки |
| GET | `/api/stats` | Статистика для дашборда |
| GET | `/api/settings` | Получение настроек |
| POST | `/api/settings` | Сохранение настроек |

---

## Скрипты

```bash
bun run dev          # Запуск dev-сервера
bun run build        # Сборка проекта
bun run start        # Запуск production
bun run db:push      # Применить схему к БД
bun run db:seed      # Заполнить начальными данными
bun run db:studio    # Prisma Studio (GUI для БД)
bun run db:migrate   # Создать миграцию
```

---

## Стек технологий

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4, Framer Motion
- **Backend:** Next.js API Routes, Prisma 5, PostgreSQL 16
- **Auth:** JWT (jose) + httpOnly cookies
- **Email:** Nodemailer + SMTP
- **Инфра:** Docker Compose, Bun
