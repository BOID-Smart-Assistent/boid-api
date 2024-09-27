import { Logger, UsePipes } from '@nestjs/common';
import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Authenticate, LLMRulesOuput, Schedule } from 'BOID-model';
import { UInt8ArrayPipe } from './pipes/uint8array.pipe';
import { WebSocketServer as Server, WebSocket } from 'ws';
import { IncomingMessage } from 'http';

@WebSocketGateway(8081, { transports: ['websocket'] })
export class EventsGateway implements OnGatewayConnection<WebSocket> {
  private readonly logger = new Logger(EventsGateway.name);

  @WebSocketServer()
  server: Server;

  algorithm: WebSocket;

  clients: Map<string, WebSocket> = new Map();

  handleConnection(client: WebSocket, ...args: any[]) {
    const message: IncomingMessage = args[0];

    if (message.headers.identification === 'boid-algorithm') {
      this.algorithm = client;
      this.logger.log('Algorithm connected to the server');
    } else {
      this.logger.log('Unknown connected to the server');
    }
  }

  @UsePipes(new UInt8ArrayPipe())
  @SubscribeMessage('authenticate')
  handleAuthentication(client: WebSocket, payload: Uint8Array) {
    this.logger.debug('Received authenticate message');

    const message = Authenticate.decode(payload);

    this.clients.set(message.id, client);

    this.logger.log(`Connection authenticated with id ${message.id}`);
  }

  @UsePipes(new UInt8ArrayPipe())
  @SubscribeMessage('message')
  handleMessage(client: any, payload: Uint8Array): string {
    // TODO: Should fix this in the future so that it uses generics
    const message = LLMRulesOuput.decode(payload);
    this.server.clients.forEach((client) => {
      client.close;
    });

    return 'Hello world!';
  }

  @UsePipes(new UInt8ArrayPipe())
  @SubscribeMessage('rules')
  handleRulesMessage(client: WebSocket, payload: Uint8Array) {
    this.logger.debug('Received LLM output');
    this.algorithm.send(payload);
    this.logger.debug('Sent LLM output to BOID algorithm');
  }

  @UsePipes(new UInt8ArrayPipe())
  @SubscribeMessage('schedule-result')
  handleScheduleResultMessage(client: WebSocket, payload: Uint8Array) {
    this.logger.debug('Received output from BOID algorithm');
    const message = Schedule.decode(payload);

    for (const timeslot of message.timeslots) {
      console.log(`${timeslot.id} : ${timeslot.presentation.label}`);
    }
  }
}
