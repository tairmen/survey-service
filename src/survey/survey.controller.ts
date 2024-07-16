import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, Req } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateSurveyDto, UpdateSurveyDto, CreateAnswerDto } from './dto';

@Controller('survey')
@UseGuards(AuthGuard('jwt'))
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Get()
  findAll() {
    return this.surveyService.findAll();
  }

  @Post()
  create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveyService.create(createSurveyDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveyService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
    return this.surveyService.update(+id, updateSurveyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surveyService.remove(+id);
  }

  @Post(':id/answers')
  createAnswers(@Req() req: any, @Param('id') id: string, @Body() createAnswerDto: CreateAnswerDto) {
    return this.surveyService.createAnswers(+id, createAnswerDto, req.user.sub);
  }
}
