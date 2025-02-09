import { CustomContext } from "./types.js";
import { Markup } from "telegraf";

// Обработчик выбора тем с индикацией ожидания
export const handleTopics = async (ctx: CustomContext) => {
    if (!ctx.match || !ctx.chat) return;

    let message = "Интересны ли вам мои стартапы?";
    switch (ctx.match[0]) {
        case "topic_finance":
            message = "Интересны ли вам темы по финансам?";
            break;
        case "topic_training":
            message = "Интересны ли вам мои тренировки?";
            break;
    }

    // Отправляем сообщение об обработке
    const waitingMessage = await ctx.reply("⌛ Обрабатываю...");

    // Эмулируем задержку (чтобы показать процесс ожидания)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Проверяем, существует ли `ctx.chat` перед удалением сообщения
    if (ctx.chat) {
        await ctx.telegram.deleteMessage(ctx.chat.id, waitingMessage.message_id);
    }

    await ctx.reply(message, questionButtons);
};

// Обработчик ответа "Да" / "Нет" с индикацией ожидания
export const handleAnswers = async (ctx: CustomContext) => {
    if (!ctx.match || !ctx.chat) return;

    const responseMessage = ctx.match[0] === "answer_yes"
        ? "Отлично! Рад, что вам интересно."
        : "Понял, учту!";

    // Отправляем сообщение об обработке
    const waitingMessage = await ctx.reply("⌛ Обрабатываю...");

    // Эмулируем задержку (чтобы показать процесс ожидания)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Проверяем, существует ли `ctx.chat` перед удалением сообщения
    if (ctx.chat) {
        await ctx.telegram.deleteMessage(ctx.chat.id, waitingMessage.message_id);
    }

    await ctx.reply(responseMessage);
};

// Кнопки "Да" / "Нет"
const questionButtons = Markup.inlineKeyboard([
    [Markup.button.callback("Да", "answer_yes"), Markup.button.callback("Нет", "answer_no")]
]);
