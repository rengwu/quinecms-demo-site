import { constants } from 'node:fs';
import { copyFile } from 'node:fs/promises';

try {
  await copyFile(
    new URL('../.env.example', import.meta.url),
    new URL('../.env', import.meta.url),
    constants.COPYFILE_EXCL,
  );
  console.log('Created .env with the public demo login.');
} catch (error) {
  if (error.code !== 'EEXIST') throw error;
  console.log('Existing .env retained; site commands still enforce demo mode.');
}
