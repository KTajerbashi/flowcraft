import dotenv from 'dotenv';

dotenv.config();

import app from './app';

import {
  AppContext
} from './core/context/app-context';

const PORT = Number(process.env['PORT']) || 5000;

const context =
  new AppContext();

async function bootstrap() {

  try {

    await context.connect();

    app.listen(
      PORT,
      () => {

        console.log(
          `Server running on port ${PORT}`
        );

        console.log(
          `API: http://localhost:${PORT}/api`
        );
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