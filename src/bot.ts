import { Telegraf, Markup, Context } from "telegraf";
import * as dotenv from "dotenv";

// Загружаем переменные окружения
dotenv.config();

// Получаем токен бота из `.env`
const BOT_TOKEN: string | undefined = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
    throw new Error("❌ BOT_TOKEN не найден в .env");
}

// Инициализация бота с типизацией `Context`
const bot: Telegraf<Context> = new Telegraf(BOT_TOKEN);

console.log("🚀 Запуск бота...");

// Проверяем подключение к Telegram API
bot.telegram.getMe()
    .then((botInfo) => {
        console.log(`✅ Бот подключён: \x1b]8;;https://t.me/${botInfo.username}\x1b\\@${botInfo.username}\x1b]8;;\x1b\\`);
    })
    .catch((err) => {
        console.error("❌ Ошибка подключения к Telegram API:", err);
        process.exit(1);
    });

// Команда `/start`
bot.start((ctx) => {
    ctx.reply(
        "Привет! Интересны ли вам мои темы?",
        Markup.inlineKeyboard([
            [Markup.button.callback("Стартапы", "topic_startups")],
            [Markup.button.callback("Финансы", "topic_finance")],
            [Markup.button.callback("Тренировки", "topic_training")]
        ])
    );
});

// Кнопки для ответов "Да"/"Нет"
const questionButtons = Markup.inlineKeyboard([
    [Markup.button.callback("Да", "answer_yes"), Markup.button.callback("Нет", "answer_no")]
]);

// Обработчики кнопок
bot.action("topic_startups", (ctx) => ctx.reply("Интересны ли вам мои стартапы?", questionButtons));
bot.action("topic_finance", (ctx) => ctx.reply("Интересны ли вам темы по финансам?", questionButtons));
bot.action("topic_training", (ctx) => ctx.reply("Интересны ли вам мои тренировки?", questionButtons));
bot.action("answer_yes", (ctx) => ctx.reply("Отлично! Рад, что вам интересно."));
bot.action("answer_no", (ctx) => ctx.reply("Понял, учту!"));

// Запуск бота
console.log("⚡ Перед bot.launch()");
bot.launch()
    .then(() => {
        console.log("✅ Бот запущен");
    })
    .catch((err) => {
        console.error("❌ Ошибка запуска бота:", err);
        process.exit(1);
    });

// Остановка бота при завершении процесса
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

// Экспорт бота для тестирования или других модулей
export default bot;
