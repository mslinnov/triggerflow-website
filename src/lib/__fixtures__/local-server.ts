/**
 * Faux serveur HTTP sur la machine elle-même, pour les tests qui passent par le vrai fetch
 * (redirections, routes du site) sans jamais sortir sur le réseau.
 */
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import type { AddressInfo } from 'node:net';

export type LocalServer = {
  /** http://localhost:<port>, la seule base en clair que les relais du site acceptent. */
  url: string;
  /** Les demandes reçues, dans l'ordre. */
  hits: IncomingMessage[];
  close: () => Promise<void>;
};

export async function localServer(answer: (request: IncomingMessage, response: ServerResponse) => void): Promise<LocalServer> {
  const hits: IncomingMessage[] = [];
  const server = createServer((request, response) => {
    hits.push(request);
    answer(request, response);
  });
  await new Promise<void>((resolve) => server.listen(0, 'localhost', resolve));
  const { port } = server.address() as AddressInfo;

  return {
    url: `http://localhost:${port}`,
    hits,
    close: () =>
      new Promise<void>((resolve) => {
        server.closeAllConnections();
        server.close(() => resolve());
      }),
  };
}
