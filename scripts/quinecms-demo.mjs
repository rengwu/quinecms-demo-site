import './demo-env.mjs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const engineRoot = dirname(require.resolve('quinecms/package.json'));
await import(pathToFileURL(join(engineRoot, 'bin/quinecms.mjs')).href);
