/**
 * Header + footer logo.
 * - Default: `/Navbar-logo.png` — place the file at `public/Navbar-logo.png` (served from site root).
 * - Optional: `VITE_NAVBAR_LOGO_URL` = full HTTPS URL (e.g. CDN) to override.
 */
const custom =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_NAVBAR_LOGO_URL
    ? String(import.meta.env.VITE_NAVBAR_LOGO_URL).trim()
    : '';

export const NAVBAR_LOGO_SRC = custom || '/Navbar-logo.png';
