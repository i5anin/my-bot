import { Telegraf, Context } from "telegraf";
import { handleStart, handleTopics, handleAnswers } from "./handlers";

export const registerCommands = (bot: Telegraf<Context>) => {
    console.log("📌 Регистрируем команды");

    bot.start(handleStart);
    bot.action("topic_startups", handleTopics);
    bot.action("topic_finance", handleTopics);
    bot.action("topic_training", handleTopics);
    bot.action("answer_yes", handleAnswers);
    bot.action("answer_no", handleAnswers);
};
