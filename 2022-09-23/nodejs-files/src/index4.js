import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    const salesDir = path.join(__dirname, 'stores');
    const salesTotalsDir = path.join(__dirname, 'salesTotals');

    try {
        await fs.mkdir(salesTotalsDir);
    } catch {
        console.log(`${salesTotalsDir} already exists.`);
    }

    const salesFiles = await findSalesFiles(salesDir);

    await fs.writeFile(path.join(salesTotalsDir, 'totals.txt'), String());
    console.log(`Wrote sales totals to ${salesTotalsDir}`);
}

async function findSalesFiles(directory) {
    let salesFiles = [];
    async function findFiles(directory) {
        const items = await fs.readdir(directory, { withFileTypes: true });
        for (let item of items) {
            if (item.isDirectory()) {
                await findFiles(path.join(directory, item.name));
            } else {
                if (extname(item.name) === '.json') {
                    salesFiles.push(path.join(directory, item.name));
                }
            }
        }
    }
    await findFiles(directory);
    return salesFiles;
}

main();