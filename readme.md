# PartyBus Node.js Library

The PartyBus Node library provides convenient access to the PartyBus API from applications written in server-side JavaScript.

## Installation

To install the package:
```
npm install @party-bus/client --save
# or
yarn add @party-bus/client
```

## Usage

After creating a PartyBus connection, grab the id and the secret from connection configuration.

```
import PartyBus from `@party-bus/client';

const client = PartyBus({ secret: 'connection secret' });
const connectionId = 'e7ff4ade-bd8d-4636-99ef-aa9b98adc7a1';

const response = await client.connections.events.create(
  connectionId,
  {
    topic: 'user.created,
    payload: {
      email: 'test@account.com',
      name: 'test account',
    },
  },
);

const { data, success } = await response.json();
```
