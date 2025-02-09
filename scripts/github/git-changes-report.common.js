const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

try {
  // Определяем пути
  const gitDir = path.join(__dirname);
  const commitTemplatePath = path.join(__dirname, "COMMIT_TEMPLATE.md");
  const gitChangesPath = path.join(gitDir, "commit_report.md");

  // Создаём папку "git", если её нет
  if (!fs.existsSync(gitDir)) {
    fs.mkdirSync(gitDir, { recursive: true });
  }

  // Читаем шаблон коммита из файла
  const commitTemplate = fs.readFileSync(commitTemplatePath, "utf-8").trim();

  // Получаем статус изменённых файлов
  const status = execSync("git status --short", { encoding: "utf-8" }).trim();

  // Получаем детальный diff
  const diff = execSync("git diff", { encoding: "utf-8" }).trim();

  // Формируем финальный текст в формате Markdown
  const output = `# Git Changes Report

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
`;

  // Записываем в файл Markdown
  fs.writeFileSync(gitChangesPath, output);

  console.log(
    `✅  Изменения сохранены в ${gitChangesPath}. Отправь мне этот файл!`,
  );
} catch (error) {
  console.error("❌ Ошибка при выполнении Git-команд:", error.message);
}
