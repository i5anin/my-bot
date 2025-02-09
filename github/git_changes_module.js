import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Получаем __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  // Определяем пути
  const commitTemplatePath = path.join(__dirname, "COMMIT_TEMPLATE.md");

  // Читаем шаблон коммита из файла
  const commitTemplate = fs.existsSync(commitTemplatePath)
      ? fs.readFileSync(commitTemplatePath, "utf-8").trim()
      : "Шаблон коммита отсутствует.";

  // Получаем статус изменённых файлов
  const status = execSync("git status --short", { encoding: "utf-8" }).trim();

  // Получаем детальный diff
  const diff = execSync("git diff", { encoding: "utf-8" }).trim();

  // Формируем финальный текст в формате Markdown и выводим в консоль
  console.log(`
# Git Changes Report

## 📌 Изменённые файлы:
\`\`\`
${status || "Нет изменений"}
\`\`\`

## 📌 Разница (diff):
\`\`\`diff
${diff || "Нет изменений"}
\`\`\`

---

## 📜 Шаблон коммита
${commitTemplate}
`);
} catch (error) {
  console.error("❌ Ошибка при выполнении Git-команд:", error.message);
}
