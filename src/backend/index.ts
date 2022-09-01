import { SetupServer } from './server';
import dotenv from 'dotenv'
(async (): Promise<void> => {
  const server = new SetupServer();
  dotenv.config()
  await server.init();
  server.start();
})();