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

    const response = await client.connections.events.create(connectionId, attributes);

    const { data, success } = await response.json();

    assert(success === true);
    assert(data.topic === 'user.created');
  });
});
