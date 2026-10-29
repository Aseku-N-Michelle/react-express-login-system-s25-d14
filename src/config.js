// Backend address. On Netlify set VITE_API_URL to your Render link
// (no trailing slash). Locally it falls back to http://localhost:3001.
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');