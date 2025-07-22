
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SupportMessage } from '@/support-message/entities/support-message.entity';

@WebSocketGateway({ cors: true }) // abilita CORS per React frontend
export class SupportGateway {
  @WebSocketServer()
  server: Server;

  sendNewMessage(message: SupportMessage) {
    // Invia il messaggio a tutti i client connessi al canale specifico
    this.server.to(message.supportRequest.id).emit('newMessage', message);
  }

  @SubscribeMessage('joinSupport')
  handleJoinRoom(@MessageBody() supportRequestId: string) {
    // Lato server, un client entra nella stanza dedicata
    const socket = this.server.sockets; // opzionale
    socket.adapter.rooms[supportRequestId];
  }
}
