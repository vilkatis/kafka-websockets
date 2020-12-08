import 'reflect-metadata';
import { Server } from './server';

/**
 * Anonymous function, starts the server.
 */
(async () => {
  const server = new Server();
  await server.start();
})();
