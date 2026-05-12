/**
 * Loads Vite-style env files into process.env so Node pre-scripts see VITE_* vars
 * before `vite` runs (predev / prebuild do not use Vite's env loader).
 * Later files override earlier keys (matches common .env layering).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const projectRoot = path.join(__dirname, '..');

const envFiles = ['.env', '.env.local', '.env.production', '.env.production.local'];

function applyLine(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const eq = trimmed.indexOf('=');
  if (eq < 1) return;
  const key = trimmed.slice(0, eq).trim();
  let val = trimmed.slice(eq + 1).trim();
  if (
    (val.startsWith('"') && val.endsWith('"')) ||
    (val.startsWith("'") && val.endsWith("'"))
  ) {
    val = val.slice(1, -1);
  }
  process.env[key] = val;
}

for (const name of envFiles) {
  const p = path.join(projectRoot, name);
  if (!fs.existsSync(p)) continue;
  const text = fs.readFileSync(p, 'utf8');
  for (const line of text.split(/\r?\n/)) {
    applyLine(line);
  }
}
