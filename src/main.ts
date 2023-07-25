import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { load as loadYaml } from 'js-yaml';
import * as process from 'process';

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

async function setupSwagger(app) {
  SwaggerModule.setup(
    'api',
    app,
    loadYaml(await readFile('./doc/api.yaml', 'utf8')),
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await setupSwagger(app);

  await app.listen(PORT);
}
bootstrap();
