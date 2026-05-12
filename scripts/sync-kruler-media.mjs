import './load-root-env.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const srcRoot = path.join(root, "Kruler's Media");
const destRoot = path.join(root, 'public', 'media');

const mediaCdnBase = String(process.env.VITE_MEDIA_BASE_URL || '').trim();
if (mediaCdnBase) {
  console.log(
    "[sync-kruler-media] Skipped: VITE_MEDIA_BASE_URL is set — media is loaded from your CDN/S3 (not copied from Kruler's Media)."
  );
  process.exit(0);
}

if (!fs.existsSync(srcRoot)) {
  console.error("[sync-kruler-media] Missing source folder:", srcRoot);
  process.exit(1);
}

const marker = path.join(srcRoot, 'EL WHERE HOTEL');
if (!fs.existsSync(marker)) {
  console.error("[sync-kruler-media] Source does not look like Kruler's Media (missing EL WHERE HOTEL).");
  process.exit(1);
}

fs.rmSync(destRoot, { recursive: true, force: true });
fs.mkdirSync(destRoot, { recursive: true });

if (process.platform === 'win32') {
  const r = spawnSync('robocopy', [srcRoot, destRoot, '/E', '/NFL', '/NDL', '/NJH', '/NJS', '/R:1', '/W:1'], {
    stdio: 'inherit',
    windowsHide: true,
  });
  const code = r.status ?? 0;
  if (code >= 8) {
    console.error('[sync-kruler-media] robocopy failed with code', code);
    process.exit(1);
  }
} else {
  const entries = fs.readdirSync(srcRoot, { withFileTypes: true });
  for (const ent of entries) {
    const from = path.join(srcRoot, ent.name);
    const to = path.join(destRoot, ent.name);
    if (ent.isDirectory()) {
      fs.cpSync(from, to, { recursive: true });
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

console.log("[sync-kruler-media] Done: Kruler's Media -> public/media");
