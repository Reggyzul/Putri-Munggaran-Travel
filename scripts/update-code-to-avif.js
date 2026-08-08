import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('src');
const publicDir = path.resolve('public');

// List of generated AVIF basenames in public/
const avifFiles = fs.readdirSync(publicDir)
  .filter(f => f.endsWith('.avif'))
  .map(f => path.parse(f).name);

console.log('Available AVIF bases:', avifFiles);

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  avifFiles.forEach(baseName => {
    // Match /baseName.jpg or /baseName.png
    const regexJpg = new RegExp(`'/${baseName}\\.jpg'`, 'g');
    const regexPng = new RegExp(`'/${baseName}\\.png'`, 'g');
    const regexDblJpg = new RegExp(`"/${baseName}\\.jpg"`, 'g');
    const regexDblPng = new RegExp(`"/${baseName}\\.png"`, 'g');

    if (regexJpg.test(content) || regexPng.test(content) || regexDblJpg.test(content) || regexDblPng.test(content)) {
      content = content.replace(new RegExp(`'/${baseName}\\.(jpg|png)'`, 'g'), `'/${baseName}.avif'`);
      content = content.replace(new RegExp(`"/${baseName}\\.(jpg|png)"`, 'g'), `"/${baseName}.avif"`);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Updated image paths in: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      replaceInFile(fullPath);
    }
  });
}

walkDir(srcDir);
console.log('🎉 Code references updated to .avif successfully!');
