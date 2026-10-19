import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { AppContext } from './core/context/app-context';
import { initializeDatabase } from './core/context/database-initializer';

const PORT = Number(process.env['PORT']) || 5000;

const context =
  new AppContext();

async function bootstrap() {

  try {

    await context.connect();
    await initializeDatabase();

    app.listen(
      PORT,
      () => {

        console.log('=================================');
        console.log(' FlowCraft Backend');
        console.log('=================================');
        console.log(` Server running on port ${PORT}`);
        console.log(` http://localhost:${PORT}`);
        console.log('=================================');
      }
    );

  } catch (error) {

    console.error(
      'Application startup failed:',
      error
    );

    process.exit(1);
  }
}

bootstrap();