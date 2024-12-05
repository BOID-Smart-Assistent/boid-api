import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LLMRulesOuput } from 'BOID-model';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class BoidService {
  constructor(
    private readonly httpService: HttpService,
    private readonly websocket: EventsGateway,
  ) {}

  private readonly logger = new Logger(BoidService.name);

  async schedule(id: number) {
    const rules = await this.getRules(id);

    this.logger.debug(`Received rules from LLM: ${rules.rules}`);

    this.websocket.sendRulesToBoid(rules);
  }

  private async getRules(id: number): Promise<LLMRulesOuput> {
    // const res = await firstValueFrom(
    //   this.httpService.get(`http://host.docker.internal:8082/userid/${id}`),
    // );

    const rules =
      'BOID LOGIC:\n' +
      'true -O-> machine_learning\n' +
      'true -D-> quantum_computing_basics\n' +
      'true -D-> introduction_to_ai\n' +
      'true -D-> data_science_with_python\n' +
      'true -D-> natural_language_processing\n' +
      '\n' +
      'machine_learning -B-> timeslot_1_a\n' +
      'quantum_computing_basics -B-> timeslot_2_a\n' +
      'introduction_to_ai -B-> timeslot_2_b\n' +
      'data_science_with_python -B-> timeslot_3_a\n' +
      'natural_language_processing -B-> timeslot_3_b';

    return LLMRulesOuput.create({
      rules: rules
        .split('\n')
        .slice(1)
        .map((line) => line.trim())
        .filter((line) => line),
    });
  }
}
