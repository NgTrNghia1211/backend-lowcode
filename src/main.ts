import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiConfigService } from './shared/services/api-config.service';
import rateLimit from 'express-rate-limit';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { SharedModule } from './shared/shared.module';

export async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  const configService = app.select(SharedModule).get(ApiConfigService);

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  const shutdown = () => {
    app
      .close()
      .then(() => {
        console.info('Server successfully shutdown');
        process.exit(0);
      })
      .catch((error) => {
        console.error('Error occurred during shutdown:', error);
        process.exit(1);
      });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  const port = configService.app.port || 3000;
  await app.listen(port, '0.0.0.0');

  console.info(`Server running on ${await app.getUrl()}`);

  return app;
}

bootstrap();
