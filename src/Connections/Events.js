import PublicClient from '../Clients/PublicClient.js';

export default function Events(configuration) {
  const client = PublicClient(configuration);

  return {
    create(connectionId, event) {
      return client.post(`connections/${connectionId}/events`, { event });
    },
  };
}
