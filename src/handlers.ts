import { CustomContext } from "./types.js"; // Импортируем наш кастомный контекст
import { Markup } from "telegraf";

// Обработчик /start
export const handleStart = (ctx: CustomContext) => {
    ctx.reply(
        "Привет! Интересны ли вам мои темы?",
        Markup.inlineKeyboard([
            [Markup.button.callback("Стартапы", "topic_startups")],
            [Markup.button.callback("Финансы", "topic_finance")],
            [Markup.button.callback("Тренировки", "topic_training")]
        ])
    );
};

// Кнопки "Да" / "Нет"
const questionButtons = Markup.inlineKeyboard([
    [Markup.button.callback("Да", "answer_yes"), Markup.button.callback("Нет", "answer_no")]
]);

// Обработчик выбора тем
export const handleTopics = (ctx: CustomContext) => {
    if (!ctx.match) return; // 🔹 Защита от `null`

    let message = "Интересны ли вам мои стартапы?";

    switch (ctx.match[0]) {
        case "topic_finance":
            message = "Интересны ли вам темы по финансам?";
            break;
        case "topic_training":
            message = "Интересны ли вам мои тренировки?";
            break;
    }

    ctx.reply(message, questionButtons);
};

// Обработчик ответа "Да" / "Нет"
export const handleAnswers = (ctx: CustomContext) => {
    if (!ctx.match) return; // 🔹 Защита от `null`

    const message = ctx.match[0] === "answer_yes"
        ? "Отлично! Рад, что вам интересно."
        : "Понял, учту!";

    ctx.reply(message);
};
