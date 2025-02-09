import { Telegraf, Context } from "telegraf";
import { formatBotLink } from "./globals.js";
import { registerCommands } from "./commands.js";

// Гарантируем, что глобальный BOT_TOKEN существует
if (!global.BOT_TOKEN) {
    throw new Error("❌ BOT_TOKEN не найден. Проверьте .env");
}

// Используем global.BOT_TOKEN!, так как уже проверили, что он существует
const bot: Telegraf<Context> = new Telegraf(global.BOT_TOKEN!);
console.log("🚀 Бот инициализирован");

// Проверяем подключение к Telegram API
bot.telegram.getMe()
    .then((botInfo) => {
        console.log(`✅ Бот подключён: ${formatBotLink(botInfo.username)}`);
    })
    .catch((err) => {
        console.error("❌ Ошибка подключения к Telegram API:", err);
        process.exit(1);
    });

// Регистрируем команды
registerCommands(bot);

export default bot;
