import { Body, Controller, Post } from '@nestjs/common';
import { EvalService } from './eval.service';
import { CreateEvalDto } from './dto/create-eval.dto';

@Controller('eval')
export class EvalController {
  constructor(private readonly evalService: EvalService) {}

  @Post()
  async create(@Body() createEvalDto: CreateEvalDto) {
    try {
      return await this.evalService.create(createEvalDto);
    } catch (error) {
      throw error;
    }
  }
}
