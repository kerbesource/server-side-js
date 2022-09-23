import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// List contents in a directory
const files = await fs.readdir('dir');
console.log(files);

// Determine content type
const items = await fs.readdir('dir', {withFileTypes: true});
for (let item of items) {
    const type = item.isDirectory() ? 'directory' : 'file';
    console.log(`${item.name} (${type})`);
}

// A note about recursion
function findAllFiles(directory) {
    let items = [];
    fs.readdir(directory, {withFileTypes: true}).then((items) => {
        items.forEach((item) => {
            if (item.isDirectory()) {
                findAllFiles(directory + '/' + item.name);
            }
            else {
                console.log(`File: ${item.name} in folder ${directory}`);
            }
        });
    });
}
(() => findAllFiles('dir'))();

// Determine the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

// Create directories
await fs.mkdir(path.join(__dirname, 'stores', '201', 'newDir'), {recursive: true});

// Make sure directories exist
const pathToCreate = path.join(__dirname, 'stores', '201', 'newDirectory');
try {
    await fs.mkdir(pathToCreate);
} catch {
    console.log(`${pathToCreate} already exists.`);
}

// Create files
await fs.writeFile(path.join(__dirname, 'greeting.txt'), String());

// Read data from files
console.log(String(await fs.readFile('stores/201/sales.json')));

// Parse data in files
console.log(JSON.parse(await fs.readFile('stores/201/sales.json')));

// Write data to files
const data = JSON.parse(await fs.readFile('stores/201/sales.json'));
await fs.writeFile('src/salesTotals/totals.txt', data.total.toString());
