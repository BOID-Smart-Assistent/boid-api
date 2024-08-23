import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class UInt8ArrayPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return Uint8Array.from(value);
  }
}
