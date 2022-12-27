import { Module } from '@nestjs/common';
import { ChatFrontEndController } from './chatfront.controller';

@Module({
    controllers: [ChatFrontEndController],
})
export class ChatFrontEndModule {}