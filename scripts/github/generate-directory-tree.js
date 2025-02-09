import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Путь к файлу с директорией
const directoryFilePath = "dir.txt";

const IGNORED_DIRECTORIES = [".idea", "node_modules", "dist", "doc", ".git", "github"];

function generateDirectoryTree(dirPath, indent = "") {
    try {
        const items = fs.readdirSync(dirPath);

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            // Пропустить игнорируемые директории
            if (IGNORED_DIRECTORIES.includes(item)) {
                continue;
            }

            const itemPath = path.join(dirPath, item);
            const isLast = i === items.length - 1;

            if (fs.statSync(itemPath).isDirectory()) {
                console.log(`${indent}${isLast ? "└─" : "├─"} 📂 ${item}`);
                generateDirectoryTree(itemPath, `${indent}${isLast ? "  " : "|  "}`);
            } else {
                console.log(`${indent}${isLast ? "└─" : "├─"} ${item}`);
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${dirPath}:`, error.message);
    }
}

// Чтение пути директории из файла
function getDirectoryFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, "utf8").trim();
        return data;
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
        process.exit(1);
    }
}

// Получаем путь из файла
const directory = getDirectoryFromFile(directoryFilePath);

if (!fs.existsSync(directory)) {
    console.error(`Directory does not exist: ${directory}`);
    process.exit(1);
}

generateDirectoryTree(directory);
