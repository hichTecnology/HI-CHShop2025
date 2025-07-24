
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SupportMessage } from '@/support-message/entities/support-message.entity';

@WebSocketGateway({ cors:  {
  origin: "*", // o il dominio React/Next
  credentials: true,
}, }) // abilita CORS per React frontend
export class SupportGateway {
  @WebSocketServer()
  server: Server;

  sendNewMessage(message: SupportMessage) {
    // Invia il messaggio a tutti i client connessi al canale specifico
    this.server.to(message.supportRequest.id).emit('newMessage', message);
  }

  @SubscribeMessage('joinSupport')
  handleJoinRoom(
    @MessageBody() supportRequestId: string,
    @ConnectedSocket() client: Socket
  ) {
    client.join(supportRequestId); // ✅ Join effettivo della stanza
    console.log(`Client ${client.id} joined room ${supportRequestId}`);
  }
}
