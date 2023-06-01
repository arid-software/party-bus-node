import assert from 'assert';
import 'dotenv/config';
import PartyBus from '../../src/index.js'

describe('connection events', () => {
  it('it creates an event', async () => {
    const secret = process.env.SECRET;
    const connectionId = process.env.CONNECTION_ID;
    const client = PartyBus({
      secret,
    });

    const attributes = {
      topic: 'user.created',
      payload: {
        name: 'test name',
      },
    };

    const { data, success } = await client.connections.events.create(connectionId, attributes);

    assert(success === true);
    assert(data.topic === 'user.created');
  });

  it('it gracefully handles event creation failure', async () => {
    const secret = 'invalid secret';
    const connectionId = process.env.CONNECTION_ID;
    const client = PartyBus({
      secret,
    });

    const attributes = {
      topic: 'user.created',
      payload: {
        name: 'test name',
      },
    };

    const { error, success } = await client.connections.events.create(connectionId, attributes);

    assert(success === false);
    assert(error);
  });
});
