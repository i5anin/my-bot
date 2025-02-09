import * as dotenv from "dotenv";

// Загружаем переменные окружения
dotenv.config();

// Объявляем BOT_TOKEN в глобальной области
declare global {
    var BOT_TOKEN: string | undefined;
}

// Присваиваем значение глобальной переменной
global.BOT_TOKEN = process.env.BOT_TOKEN;

if (!global.BOT_TOKEN) {
    throw new Error("❌ BOT_TOKEN не найден в .env");
}

console.log("🚀 Переменные окружения загружены");

// ANSI-ссылка для кликабельного вывода в терминале
export const formatBotLink = (username: string) =>
    `\x1b]8;;https://t.me/${username}\x1b\\@${username}\x1b]8;;\x1b\\`;
