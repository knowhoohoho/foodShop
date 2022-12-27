import { Module } from "@nestjs/common";
import { ChatGateWay } from "./chat.gateway";
import { ChatRoomService } from "./chatRoom.service";
@Module({
  providers: [ ChatGateWay, ChatRoomService ]

})
export class ChatModule {}
