import { loadEnvFile } from 'node:process';

try {
  loadEnvFile(new URL('../.env', import.meta.url));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

// This repository only builds demos. Host or .env settings cannot turn this off.
process.env.ADMIN_DEMO_MODE = 'true';
process.env.ADMIN_EMAIL ||= 'demo@quinecms.local';
process.env.ADMIN_PASSWORD ||= 'quinecms-demo';
