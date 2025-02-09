import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Получаем путь к текущему файлу и его директории
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функция для рекурсивного обхода директорий
const readDirectory = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error("❌ Ошибка чтения директории:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`❌ Ошибка получения информации о файле ${file}:`, err);
          return;
        }

        if (stats.isDirectory()) {
          // Если это директория, рекурсивно обрабатываем её
          readDirectory(filePath);
        } else {
          const icon = "📜"; // Всегда иконка 📜

          // Проверяем, является ли файл текстовым
          const isTextFile = /\.(txt|md|js|ts|json|html|css)$/i.test(file);

          if (isTextFile) {
            console.log(`${icon} ${file}`);

            // Читаем содержимое текстового файла (до 5000 символов)
            try {
              const content = fs.readFileSync(filePath, "utf8");
              console.log("🔍 Содержимое:");
              console.log(content.substring(0, 5000)); // Ограничиваем вывод 5000 символами
              console.log("—".repeat(50));
            } catch (error) {
              console.error(`❌ Ошибка чтения файла ${file}:`, error.message);
            }
          } else {
            // Если файл не текстовый, пропускаем его
            console.log(`📁 Пропускаем бинарный файл: ${file}`);
          }
        }
      });
    });
  });
};

// Читаем пути из файла
const readDirectoriesFromFile = (filePath) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("❌ Ошибка чтения файла с путями:", err);
      return;
    }

    const directories = data
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean); // Разделяем по строкам и убираем пустые строки

    // Обрабатываем все указанные директории и файлы
    directories.forEach((dirOrFile) => {
      fs.stat(dirOrFile, (err, stats) => {
        if (err) {
          console.error("❌ Ошибка получения информации о пути:", err);
          return;
        }

        if (stats.isDirectory()) {
          console.log(`📂 Обрабатываем директорию: ${dirOrFile}`);
          readDirectory(dirOrFile);
        } else if (stats.isFile()) {
          const icon = "📜"; // Всегда иконка 📜
          console.log(`${icon} ${dirOrFile}`);

          // Проверяем, является ли файл текстовым
          const isTextFile = /\.(txt|md|js|ts|json|html|css)$/i.test(dirOrFile);

          if (isTextFile) {
            // Читаем содержимое текстового файла (до 5000 символов)
            try {
              const content = fs.readFileSync(dirOrFile, "utf8");
              console.log("🔍 Содержимое:");
              console.log(content.substring(0, 5000)); // Ограничиваем вывод 5000 символами
              console.log("—".repeat(50));
            } catch (error) {
              console.error(
                `❌ Ошибка чтения файла ${dirOrFile}:`,
                error.message
              );
            }
          } else {
            console.log(`📁 Пропускаем бинарный файл: ${dirOrFile}`);
          }
        }
      });
    });
  });
};

// Указываем путь к файлу с директориями и файлами
const directoriesFile = "dirs.txt";

// Читаем пути из файла
readDirectoriesFromFile(directoriesFile);
