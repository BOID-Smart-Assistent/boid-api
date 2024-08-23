import { UsePipes } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { LLMRulesOuput } from 'BOID-model';
import { UInt8ArrayPipe } from './pipes/uint8array.pipe';

@WebSocketGateway(8081, { transports: ['websocket'] })
export class EventsGateway {
  @UsePipes(new UInt8ArrayPipe())
  @SubscribeMessage('message')
  handleMessage(client: any, payload: Uint8Array): string {
    const message = LLMRulesOuput.decode(payload);
    console.log(message);
    return 'Hello world!';
  }
}
