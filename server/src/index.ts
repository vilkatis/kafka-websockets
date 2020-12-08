import 'reflect-metadata';
import { Server } from './server';
import { useContainer } from 'routing-controllers';
import { Container } from 'typedi';
useContainer(Container);

/**
 * Anonymous function, starts the server.
 */
(async () => {
  const server = new Server();
  await server.start();
})();
