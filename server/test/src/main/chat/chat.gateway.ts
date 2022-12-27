import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  MessageBody
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatRoomService } from './chatRoom.service';
import { setInitDTO } from './dto/chat.room.dto';


@WebSocketGateway(5000, {
  cors :{
    origin : 'http://localhost:3000'
  }
})
export class ChatGateWay  implements  OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly chatroomservice : ChatRoomService) {}
  
  @WebSocketServer()
  server :Server;




  public handleConnection(client: Socket): void {
    console.log('connected', client.id);
    client.leave(client.id);
    client.data.roomId = `room:lobby`;
    client.join('room:lobby');
}


public handleDisconnect(client: Socket): void {
  const { roomId } = client.data;
  if (
      roomId != 'room:lobby' &&
      !this.server.sockets.adapter.rooms.get(roomId)
  ) {
      this.chatroomservice.deleteChatRoom(roomId);
      this.server.emit(
          'getChatRoomList',
          this.chatroomservice.getChatRoomList(),
      );
  }
  console.log('disonnected', client.id);
}

  @SubscribeMessage('setInit')
    setInit(client: Socket, data: setInitDTO): setInitDTO {
        client.data.nickname = data.nickname
            ? data.nickname
            : '낯선사람' + client.id;

        client.data.isInit = true;

        return {
            nickname: client.data.nickname,
            room: {
                roomId: 'room:lobby',
                roomName: '로비',
            },
        };
    }

    @SubscribeMessage('getChatRoomList')
    getChatRoomList(client: Socket, payload: any) {
        client.emit('getChatRoomList', this.chatroomservice.getChatRoomList());
    }


  @SubscribeMessage('sendMessage')
  sendMessage(client: Socket, message: string): void {
      client.rooms.forEach((roomId) =>
          client.to(roomId).emit('getMessage', {
              id: client.id,
              nickname: client.data.nickname,
              message,
          }),
      );
  }

   //채팅방 생성하기
   @SubscribeMessage('createChatRoom')
   createChatRoom(client: Socket, roomName: string) {
       //이전 방이 만약 나 혼자있던 방이면 제거
       if (
           client.data.roomId != 'room:lobby' &&
           this.server.sockets.adapter.rooms.get(client.data.roomId).size == 1
       ) {
           this.chatroomservice.deleteChatRoom(client.data.roomId);
       }

       this.chatroomservice.createChatRoom(client, roomName);
       return {
           roomId: client.data.roomId,
           roomName: this.chatroomservice.getChatRoom(client.data.roomId)
               .roomName,
       };
   }



    //채팅방 들어가기
    @SubscribeMessage('enterChatRoom')
    enterChatRoom(client: Socket, roomId: string) {
        //이미 접속해있는 방 일 경우 재접속 차단
        if (client.rooms.has(roomId)) {
            return;
        }
        //이전 방이 만약 나 혼자있던 방이면 제거
        if (
            client.data.roomId != 'room:lobby' &&
            this.server.sockets.adapter.rooms.get(client.data.roomId).size == 1
        ) {
            this.chatroomservice.deleteChatRoom(client.data.roomId);
        }
        this.chatroomservice.joinChatRoom(client, roomId);
        return {
            roomId: roomId,
            roomName: this.chatroomservice.getChatRoom(roomId).roomName,
        };
    }

  
    @SubscribeMessage('setNickname')
    setNickname(client: Socket, nickname: string): void {
        const { roomId } = client.data;
        client.to(roomId).emit('getMessage', {
            id: null,
            nickname: '안내',
            message: `"${client.data.nickname}"님이 "${nickname}"으로 닉네임을 변경하셨습니다.`,
        });
        client.data.nickname = nickname;
    }


 






}