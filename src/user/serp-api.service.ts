import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getJson } from 'serpapi';

@Injectable()
export class SerpApiService {
  private readonly serpAPIKey: string;

  constructor(private configService: ConfigService) {
    this.serpAPIKey = configService.get<string>('SERP_API_KEY');
  }

  async getProfile(name: string) {
    const res = await getJson({
      engine: 'google_scholar_profiles',
      mauthors: name,
      api_key: this.serpAPIKey,
    });

    const profiles = res['profiles'];

    if (profiles.length < 1) {
      throw new NotFoundException();
    }

    return profiles[0];
  }
}
