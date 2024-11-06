import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join, resolve } from 'path';
import * as hbs from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useWebSocketAdapter(new WsAdapter(app));

  // Templating setup
  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./src/views'));
  app.engine(
    'hbs',
    hbs.engine({
      defaultLayout: 'main',
      layoutsDir: join(__dirname, '..', 'src', 'views', 'layouts'),
      partialsDir: join(__dirname, '..', 'src', 'views', 'partials'),
      extname: '.hbs',
      helpers: {
        block(name: string, options: any) {
          if (!this._blocks) this._blocks = {};
          const block = this._blocks[name] || [];
          block.push(options.fn(this));
          this._blocks[name] = block;
          return null;
        },
      },
    }),
  );
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
