const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const TARGET_DIRS = ['public/media', 'public/images'];
const MAX_WIDTH = 1920;
const QUALITY = 75;

async function compressDir(dirPath) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      await compressDir(fullPath);
      continue;
    }

    if (/\.(jpe?g|png)$/i.test(file)) {
      try {
        const buffer = fs.readFileSync(fullPath);
        const metadata = await sharp(buffer).metadata();

        if (metadata.width > MAX_WIDTH || stats.size > 500 * 1024) {
          console.log(`Compressing: ${fullPath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
          
          const tempPath = fullPath + '.tmp';
          await sharp(buffer)
            .resize({ width: MAX_WIDTH, withoutEnlargement: true })
            .jpeg({ quality: QUALITY, progressive: true, force: false })
            .png({ compressionLevel: 8, force: false })
            .toFile(tempPath);
          
          fs.unlinkSync(fullPath);
          fs.renameSync(tempPath, fullPath);
          
          const newStats = fs.statSync(fullPath);
          console.log(`   Done! New size: ${(newStats.size / 1024).toFixed(2)} KB`);
        }
      } catch (err) {
        console.error(`   Error processing ${file}:`, err.message);
      }
    }
  }
}

async function run() {
  console.log('Starting Bulk Compression...');
  for (const dir of TARGET_DIRS) {
    const fullDir = path.resolve(dir);
    if (fs.existsSync(fullDir)) {
      await compressDir(fullDir);
    }
  }
  console.log('All media optimized!');
}

run();
