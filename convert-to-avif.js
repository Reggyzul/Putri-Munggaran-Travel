import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');

async function convertImages() {
  console.log('Starting conversion of images in public/ to AVIF format...\n');
  const files = fs.readdirSync(publicDir);
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (imageExtensions.includes(ext) && !file.endsWith('.avif')) {
      const inputPath = path.join(publicDir, file);
      const baseName = path.basename(file, ext);
      const outputPath = path.join(publicDir, `${baseName}.avif`);

      try {
        const inputStats = fs.statSync(inputPath);
        await sharp(inputPath)
          .avif({ quality: 80, effort: 4 })
          .toFile(outputPath);
        
        const outputStats = fs.statSync(outputPath);
        const savedPercent = (((inputStats.size - outputStats.size) / inputStats.size) * 100).toFixed(1);

        console.log(`✅ Converted: ${file} (${(inputStats.size / 1024).toFixed(1)} KB) -> ${baseName}.avif (${(outputStats.size / 1024).toFixed(1)} KB) [Saved ${savedPercent}%]`);
        
        // Remove old original file
        fs.unlinkSync(inputPath);
        console.log(`🗑️ Removed old file: ${file}`);
      } catch (err) {
        console.error(`❌ Failed to convert ${file}:`, err);
      }
    }
  }

  console.log('\nAll images converted to AVIF successfully!');
}

convertImages();
