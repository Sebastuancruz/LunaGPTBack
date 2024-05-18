import OpenAI from 'openai';
import { OrthographyDto } from './dtos/index';
import { orthographyCheckUseCase } from './use-cases/index';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GptService {

private openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
})

 //Use cases
async orthographyCheck(orthographyDto: OrthographyDto){
      return await orthographyCheckUseCase( this.openai,{
            prompt: orthographyDto.prompt
      });
}
}
