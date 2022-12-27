import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './main/user/user.module'
import { BoardsModule } from './main/boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Trainer } from './entity/trainer.entity'
import { FoodsModule } from './main/foods/foods.module';
import { Foods } from './entity/foods.entity';
import { User } from './entity/user.entity'
import { Boards } from './entity/boards.entity'
import { MyPageModule } from './main/my-page/myPage.module';
import { ChatModule } from './main/chat/chat.module';
import { ChatFrontEndModule } from './main/chatfront/chatfront.module'



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath : '.env',
      isGlobal : true
    }),

    TypeOrmModule.forRoot({
      type : 'mysql',
      host : 'localhost',
      username : 'root',
      port : 3306,
      password : 'rnjsgh12',
      database : 'test',
      entities : [
        Trainer, 
        User, 
        Foods, 
        Boards],
      synchronize : true,
    }),

    UserModule,
    BoardsModule,
    FoodsModule,
    MyPageModule,
    ChatModule,
    ChatFrontEndModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}



