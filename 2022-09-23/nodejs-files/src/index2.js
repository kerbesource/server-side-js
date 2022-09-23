import { promises as fs } from 'fs';

async function main() {
    const salesFiles = await findSalesFiles("stores");
    console.log(salesFiles);
}

async function findSalesFiles(directory) {
    let salesFiles = [];
    async function findFiles(directory) {
      const items = await fs.readdir(directory, { withFileTypes: true });
      for (let item of items) {
        if (item.isDirectory()) {
            await findFiles(`${directory}/${item.name}`);
        }
        else {
            if (item.name === 'sales.json') {
                salesFiles.push(`${directory}/${item.name}`);
            }
        }
      }
    }
    await findFiles(directory);
    return salesFiles;
  }

main();