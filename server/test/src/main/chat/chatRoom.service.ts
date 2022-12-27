import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ChatRoomListDTO } from './dto/chat.room.dto'
import {v4 as uuid} from 'uuid';


@Injectable()
export class ChatRoomService {
  private chatroomlist : Record<string, ChatRoomListDTO>
  constructor() {
    this.chatroomlist = {
      'room:lobby' : {
        roomId : 'room:lobby',
        roomName : '로비',
        cheifId : 'null',
      }
    }  
  }
  createChatRoom(client : Socket, roomName : string) : void {
    const roomId = `room:${uuid()}`;
    const nickname : string = client.data.nickname;
    this.chatroomlist[roomId] = {
      roomId,
      cheifId : client.id,
      roomName
    };
    client.data.roomId = roomId;
    client.rooms.clear();
    client.join(roomId);
    client.emit('roominit', {
      id : null,
      nickname : '안내',
      message : `${nickname}님이 ${roomName} 방을 생성하였습니다.`
    })
  }

  joinChatRoom(client: Socket, roomId : string) {
    client.data.roomId = roomId;
    client.rooms.clear();
    client.join(roomId);
    const { nickname } = client.data;
    const { roomName } = this.getChatRoom(roomId);
    client.to(roomId).emit('getMessage', {
      id: null,
      nickname: '안내',
      message: `"${nickname}"님이 "${roomName}"방에 접속하셨습니다.`,
  });
  }

  exitChatRoom(client: Socket, roomId: string) {
    client.data.roomId = `room:lobby`;
    client.rooms.clear();
    client.join(`room:lobby`);
    const { nickname } = client.data;
    client.to(roomId).emit('getMessage', {
        id: null,
        nickname: '안내',
        message: '"' + nickname + '"님이 방에서 나갔습니다.',
    });
}

  getChatRoom(roomId: string): ChatRoomListDTO {
    return this.chatroomlist[roomId];
}

  getChatRoomList(): Record<string, ChatRoomListDTO> {
  return this.chatroomlist;
}


  deleteChatRoom(roomId : string) {
    delete this.chatroomlist[roomId]
 }
}