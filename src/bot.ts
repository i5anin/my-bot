import { Telegraf, Markup } from 'telegraf';
import * as dotenv from 'dotenv';


dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
    throw new Error("BOT_TOKEN не найден в .env");
}

const bot = new Telegraf(BOT_TOKEN);

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

const questionButtons = Markup.inlineKeyboard([
    [Markup.button.callback("Да", "answer_yes"), Markup.button.callback("Нет", "answer_no")]
]);

bot.action("topic_startups", (ctx) => {
    ctx.reply("Интересны ли вам мои стартапы?", questionButtons);
});

bot.action("topic_finance", (ctx) => {
    ctx.reply("Интересны ли вам темы по финансам?", questionButtons);
});

bot.action("topic_training", (ctx) => {
    ctx.reply("Интересны ли вам мои тренировки?", questionButtons);
});

bot.action("answer_yes", (ctx) => {
    ctx.reply("Отлично! Рад, что вам интересно.");
});

bot.action("answer_no", (ctx) => {
    ctx.reply("Понял, учту!");
});

bot.launch().then(() => {
    console.log("Бот запущен");
});

// Остановка бота при завершении процесса
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
