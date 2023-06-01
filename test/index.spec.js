import assert from 'assert';
import PartyBus from '../src/index.js'

describe('client', () => {
  it('fails when secret not present', async () => {
    assert.throws(
      () => {
        PartyBus({});
      },
      /Secret is required/,
    );
  });
});
