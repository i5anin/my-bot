import { CustomContext } from "./types.js";
import { Markup } from "telegraf";

// Функция для старта
export const handleStart = async (ctx: CustomContext) => {
    if (!ctx.chat) return;

    const message = "Привет! Я бот. Чем могу помочь?";
    await ctx.reply(message);
};

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
        try {
            await ctx.telegram.deleteMessage(ctx.chat.id, waitingMessage.message_id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("❌ Ошибка при удалении сообщения:", error.message);
            } else {
                console.error("❌ Неизвестная ошибка:", error);
            }
        }
    }

    await ctx.reply(message, questionButtons);
};

// Обработчик ответа "Да" / "Нет" с индикацией ожидания
export const handleAnswers = async (ctx: CustomContext) => {
    if (!ctx.match || !ctx.chat) return;

    const responseMessage =
        ctx.match[0] === "answer_yes"
            ? "Отлично! Рад, что вам интересно."
            : "Понял, учту!";

    // Отправляем сообщение об обработке
    const waitingMessage = await ctx.reply("⌛ Обрабатываю...");

    // Эмулируем задержку (чтобы показать процесс ожидания)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Проверяем, существует ли `ctx.chat` перед удалением сообщения
    if (ctx.chat) {
        try {
            await ctx.telegram.deleteMessage(ctx.chat.id, waitingMessage.message_id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("❌ Ошибка при удалении сообщения:", error.message);
            } else {
                console.error("❌ Неизвестная ошибка:", error);
            }
        }
    }

    await ctx.reply(responseMessage);
};

// Функция для отображения меню
export const showMenu = async (ctx: CustomContext) => {
    if (!ctx.chat) return;

    // Сообщение для пользователя
    const message = "Выберите одну из тем:";

    // Кнопки меню
    const menuButtons = Markup.inlineKeyboard([
        [Markup.button.callback("Стартапы", "topic_startups")],
        [Markup.button.callback("Финансы", "topic_finance")],
        [Markup.button.callback("Тренировки", "topic_training")]
    ]);

    // Отправляем сообщение с кнопками
    await ctx.reply(message, menuButtons);
};

// Кнопки "Да" / "Нет"
const questionButtons = Markup.inlineKeyboard([
    [Markup.button.callback("Да", "answer_yes"), Markup.button.callback("Нет", "answer_no")],
]);
