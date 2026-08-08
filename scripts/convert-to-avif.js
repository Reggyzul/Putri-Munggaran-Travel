import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');

async function convertImagesToAvif() {
  console.log('🚀 Starting image conversion to AVIF in public/ directory...\n');

  const files = fs.readdirSync(publicDir);
  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return (ext === '.jpg' || ext === '.jpeg' || ext === '.png') && !file.startsWith('.');
  });

  console.log(`📸 Found ${imageFiles.length} image files to convert:\n`);

  let successCount = 0;
  let totalSavedBytes = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(publicDir, file);
    const parsed = path.parse(file);
    const outputFileName = `${parsed.name}.avif`;
    const outputPath = path.join(publicDir, outputFileName);

    try {
      const originalStats = fs.statSync(inputPath);
      const originalSizeKb = (originalStats.size / 1024).toFixed(1);

      await sharp(inputPath)
        .avif({ quality: 80, effort: 5 })
        .toFile(outputPath);

      const newStats = fs.statSync(outputPath);
      const newSizeKb = (newStats.size / 1024).toFixed(1);
      const savedKb = ((originalStats.size - newStats.size) / 1024).toFixed(1);
      totalSavedBytes += (originalStats.size - newStats.size);

      console.log(`✅ ${file} (${originalSizeKb} KB) ➔ ${outputFileName} (${newSizeKb} KB) | Saved: ${savedKb} KB`);
      successCount++;
    } catch (err) {
      console.error(`❌ Failed to convert ${file}:`, err.message);
    }
  }

  console.log(`\n🎉 Conversion complete! Converted ${successCount}/${imageFiles.length} images.`);
  console.log(`📉 Total disk space saved: ${(totalSavedBytes / (1024 * 1024)).toFixed(2)} MB`);
}

convertImagesToAvif();
