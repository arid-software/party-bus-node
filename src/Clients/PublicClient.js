import { createHmac } from 'node:crypto';

const fakeResponse = { success: true };

export default function PublicClient(configuration) {
  const enabled = configuration.enabled || true;
  const apiUrl = configuration.apiUrl || 'https://partybus-api.aridsoftware.com/api/v1';
  const { secret } = configuration;

  if (!secret || secret === '') throw Error('Secret is required.');

  function now() {
    return configuration.timestamp || Date.now();
  }

  function buildUrl(path) {
    return `${apiUrl}/${path}`;
  }

  function buildHeaders(body) {
    const timestamp = now();
    const hmac = createHmac('sha256', secret)
      .update(`${timestamp}.${body}`)
      .digest('hex');
    const signature = [
      ['t', timestamp],
      ['v1', hmac],
    ]
      .map((pair) => pair.join('='))
      .join(',');

    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Party-Signature': signature,
    };
  }

  function post(path, attributes) {
    const body = JSON.stringify(attributes);
    return fetch(
      buildUrl(path),
      {
        body,
        headers: buildHeaders(body),
        method: 'POST',
      },
    ).then((response) => response.json());
  }

  return {
    buildUrl,
    buildHeaders,
    enabled,
    post,
  };
}
