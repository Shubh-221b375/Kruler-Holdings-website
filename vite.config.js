import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function mediaOriginHintsPlugin(mediaBase) {
  return {
    name: 'media-origin-hints',
    transformIndexHtml(html) {
      const lines = [];
      if (mediaBase) {
        const href = mediaBase.replace(/\/+$/, '');
        lines.push(`<link rel="dns-prefetch" href="${href}" />`);
        lines.push(`<link rel="preconnect" href="${href}" crossorigin />`);
      }
      lines.push('<link rel="preload" href="/images/back.jpg" as="image" />');
      lines.push('<link rel="preload" href="/images/house.png" as="image" />');
      const block = lines.join('\n    ');
      return html.replace('<link rel="icon"', `${block}\n    <link rel="icon"`);
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const mediaBase = (env.VITE_MEDIA_BASE_URL || '').trim();

  return {
    plugins: [react(), mediaOriginHintsPlugin(mediaBase)],
  };
});
