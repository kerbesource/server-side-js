import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    const salesDir = path.join(__dirname, '../stores');
    const salesFiles = await findSalesFiles(salesDir);
    console.log(salesFiles);
}

async function findSalesFiles(directory) {
    let salesFiles = [];
    async function findFiles(directory) {
        const items = await fs.readdir(directory, { withFileTypes: true });
        for (let item of items) {
            if (item.isDirectory()) {
                await findFiles(path.join(directory, item.name));
            } else {
                if (path.extname(item.name) === '.json') {
                    salesFiles.push(path.join(directory, item.name));
                }
            }
        }
    }
    await findFiles(directory);
    return salesFiles;
}

main();