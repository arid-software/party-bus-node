import Events from './Connections/Events.js';

export default function Connections(configuration) {
  return {
    events: Events(configuration),
  };
}
