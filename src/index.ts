import bot from "./bot";

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
