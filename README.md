# 🤖 My Telegram Bot

Бот на **Node.js + TypeScript**, использующий **Telegraf.js** для взаимодействия с API Telegram.  
Позволяет обрабатывать команды, использовать inline-кнопки и работать с локальными сессиями.

## 🚀 Функциональность
- 📌 Подключение к Telegram API через `telegraf`
- 🔄 Автоматическая регистрация команд
- 🛠️ Использует `.env` для хранения конфиденциальных данных
- 🔄 CRON-задачи через `node-cron`
- 📊 Логирование с использованием `chalk`

## 🛠️ Установка

### 1️⃣ Клонирование репозитория:
```sh
git clone https://github.com/username/my-bot.git
cd my-bot
```

### 2️⃣ Установка зависимостей:
```sh
npm install
```

### 3️⃣ Создание `.env` файла:
Создай `.env` в корне проекта:
```
BOT_TOKEN=твой_токен_бота
```

### 4️⃣ Запуск бота:
#### В TypeScript:
```sh
npm run bot_ts
```
#### В JavaScript (скомпилированном):
```sh
npm run bot_js
```

## 📂 Структура проекта
```
📦 my-bot
 ┣ 📂 src
 ┃ ┣ 📜 bot.ts          # Основная логика бота
 ┃ ┣ 📜 commands.ts     # Регистрация команд
 ┃ ┣ 📜 handlers.ts     # Обработчики команд
 ┃ ┣ 📜 globals.ts      # Глобальные переменные (BOT_TOKEN)
 ┃ ┣ 📜 index.ts        # Точка входа
 ┃ ┣ 📜 types.ts        # Типизация контекста
 ┣ 📂 github
 ┃ ┣ 📜 git_changes_module.js  # Логирование изменений в Git
 ┃ ┣ 📜 COMMIT_TEMPLATE.md     # Шаблон коммитов
 ┣ 📜 .gitignore       # Исключенные файлы
 ┣ 📜 package.json     # Конфигурация npm
 ┣ 📜 tsconfig.json    # Конфигурация TypeScript
 ┣ 📜 README.md        # Документация (этот файл)
```

## 🎯 Основные зависимости:
| Пакет                  | Описание |
|------------------------|----------|
| `telegraf`            | API для Telegram |
| `dotenv`              | Чтение переменных окружения |
| `chalk`               | Цветной вывод в консоль |
| `node-cron`           | Планирование задач |
| `axios`               | HTTP-запросы |
| `sharp`               | Работа с изображениями |
| `puppeteer`           | Headless браузер |

## 📌 Скрипты в `package.json`
| Команда               | Действие |
|----------------------|----------|
| `npm run bot_ts`    | Запуск бота с TypeScript |
| `npm run bot_js`    | Компиляция TypeScript и запуск JS |
| `npm run lint-fix`  | Исправление ошибок ESLint |

## 🛠️ Разработка
Перед коммитами рекомендуется проверять код:
```sh
npm run lint-fix
```

## 📖 Лицензия
MIT

