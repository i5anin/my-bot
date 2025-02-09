import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Получаем путь к текущему файлу и его директории
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Папки, в которых будем искать файлы
const directories = [__dirname, path.join(__dirname, "..")];

// Карта иконок по расширению
const fileIcons = {
    ".js": "📜", ".ts": "📜", ".json": "📄", ".html": "🌐",
    ".css": "🎨", ".md": "📖", ".txt": "📝", ".jpg": "🖼️",
    ".png": "🖼️", ".gif": "🎞️", ".mp4": "🎬", ".mp3": "🎵",
    ".zip": "📦", ".exe": "⚙️", ".bat": "⚡", ".sh": "🐧",
    ".sql": "🗄️", ".env": "🔐", ".log": "📑"
};

// Файлы, которые нужно найти в `../`
const additionalFiles = ["tsconfig.json", "package.json"];

directories.forEach((dir) => {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error("❌ Ошибка чтения директории:", err);
            return;
        }

        console.log(`📂 Файлы в директории: ${dir}`);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            const ext = path.extname(file);
            const icon = fileIcons[ext] || "📁"; // По умолчанию папка

            if (fs.statSync(filePath).isFile() || additionalFiles.includes(file)) {
                console.log(`${icon} ${file}`);

                // Читаем содержимое файла (до 300 символов)
                try {
                    const content = fs.readFileSync(filePath, "utf8");
                    console.log("🔍 Содержимое:");
                    console.log(content.substring(0, 5000));
                    console.log("—".repeat(50));
                } catch (error) {
                    console.error(`❌ Ошибка чтения файла ${file}:`, error.message);
                }
            }
        });
    });
});
