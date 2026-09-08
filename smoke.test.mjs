import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
assert.match(source, /id="reset"/);
assert.match(source, /id="share"/);
assert.match(source, /progress-track/);
assert.match(source, /state\.corrupt/);
console.log('Smoke checks passed: controls, progress, sharing, and corruption state are present.');
