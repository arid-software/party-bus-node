import Connections from './Connections.js';

export default function PartyBus(configuration) {
  return {
    connections: Connections(configuration),
  };
}
