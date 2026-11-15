import './demo-env.mjs';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { gunzipSync } from 'node:zlib';

// Use the exact installed engine's decryption code to inspect the built payload.
const require = createRequire(import.meta.url);
const enginePackage = require.resolve('quinecms/package.json');
const engineRequire = createRequire(enginePackage);
const { tsImport } = await import(
  pathToFileURL(engineRequire.resolve('tsx/esm/api')).href
);
const { decryptAdmin } = await tsImport(
  pathToFileURL(join(dirname(enginePackage), 'src/admin/crypto.ts')).href,
  import.meta.url,
);
const html = await readFile(new URL('../dist/admin/index.html', import.meta.url), 'utf8');
const payload = html.match(/<script\b[^>]*id="admin-payload"[^>]*>([\s\S]*?)<\/script>/);
assert(payload, 'The built admin must contain an encrypted payload.');
const decrypted = await decryptAdmin(
  JSON.parse(payload[1]),
  process.env.ADMIN_EMAIL,
  process.env.ADMIN_PASSWORD,
);
const { props } = JSON.parse(gunzipSync(decrypted).toString('utf8'));
assert.equal(props.config.demo, true, 'The built admin must use demo mode.');
assert.equal(props.config.git, null, 'The demo must not contain Git configuration.');
assert.equal(props.config.r2, null, 'The demo must not contain R2 configuration.');
console.log('Demo verified: demo mode enabled; Git and R2 configuration excluded.');
