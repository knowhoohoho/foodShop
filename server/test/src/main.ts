import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SocketIoAdapter } from './main/chat/adapters/socket-io.adapters';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors :true});
    app.useWebSocketAdapter(new SocketIoAdapter(app));
    app.setBaseViewsDir(join(__dirname, '..' , 'views'))
    app.useStaticAssets(join(__dirname, '..', 'public'))
    app.setViewEngine('ejs')
    await app.listen(3000);
  
  return app
  
}
bootstrap();
