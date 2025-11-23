const fs = require('fs');
const path = require('path');

const uiDir = path.resolve('apps/shop-web/src/components/ui');

// Helper to convert kebab-case to PascalCase
const toPascalCase = (str) => {
    return str.replace(/(^\w|-\w)/g, (match) => {
        return match.replace('-', '').toUpperCase();
    });
};

// Get all files in ui directory
const files = fs.readdirSync(uiDir);

files.forEach(file => {
    const filePath = path.join(uiDir, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile() && file.endsWith('.tsx')) {
        const fileNameWithoutExt = path.basename(file, '.tsx');

        // Skip if it's button.tsx and Button dir exists (we'll delete button.tsx later)
        if (fileNameWithoutExt === 'button' && fs.existsSync(path.join(uiDir, 'Button'))) {
            console.log(`Skipping button.tsx refactor, deleting duplicate file...`);
            fs.unlinkSync(filePath);
            return;
        }

        const pascalName = toPascalCase(fileNameWithoutExt);
        const newDir = path.join(uiDir, pascalName);

        // Create directory
        if (!fs.existsSync(newDir)) {
            fs.mkdirSync(newDir);
        }

        // Move and rename file
        const newFilePath = path.join(newDir, `${pascalName}.tsx`);
        fs.renameSync(filePath, newFilePath);

        // Create index.ts
        const indexContent = `export * from './${pascalName}'\n`;
        fs.writeFileSync(path.join(newDir, 'index.ts'), indexContent);

        console.log(`Refactored ${file} -> ${pascalName}/${pascalName}.tsx`);
    }
});

// Now update imports in all files in uiDir (recursive)
const updateImports = (dir) => {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
        const itemPath = path.join(dir, item);
        const stats = fs.statSync(itemPath);
        if (stats.isDirectory()) {
            updateImports(itemPath);
        } else if (itemPath.endsWith('.tsx') || itemPath.endsWith('.ts')) {
            let content = fs.readFileSync(itemPath, 'utf8');
            // Replace "@/components/ui/xxx" with "@/components/ui/Xxx"
            // Also handle relative imports if any, but shadcn usually uses alias
            const regex = /@\/components\/ui\/([a-z0-9-]+)/g;
            let changed = false;
            content = content.replace(regex, (match, p1) => {
                changed = true;
                return `@/components/ui/${toPascalCase(p1)}`;
            });

            if (changed) {
                fs.writeFileSync(itemPath, content);
                console.log(`Updated imports in ${itemPath}`);
            }
        }
    });
};

updateImports(uiDir);
