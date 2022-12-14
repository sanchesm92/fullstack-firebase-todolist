import { SetupServer } from './server';
import dotenv from 'dotenv'

/**
* @description
* Responsible for start server
*/

(async (): Promise<void> => {
  const server = new SetupServer();
  dotenv.config()
  await server.init();
  server.start();
})();