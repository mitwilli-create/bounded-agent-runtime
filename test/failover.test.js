import test from 'node:test';
import assert from 'node:assert/strict';
import { run } from '../src/runtime.js';

const broken = {
    name: 'broken',
    send() {
      throw new Error('provider is down');
    }
  };
  const working = {
    name: 'working',
    send() {
      return 'answer from the working provider';
    }
  };
  test('falls back to the next provider when the first one throws', async () => {
    const result = await run([broken, working], 'hello');
    assert.equal(result, 'answer from the working provider');
  });