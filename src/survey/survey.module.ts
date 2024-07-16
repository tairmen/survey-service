import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { Survey } from '../entities/survey.entity';
import { Question } from '../entities/question.entity';
import { Answer } from '../entities/answer.entity';
import { SurveyPassing } from '../entities/survey-passing.entity';
import { Conflict } from '../entities/conflict.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey, Question, Answer, SurveyPassing, Conflict, User]),
  ],
  providers: [SurveyService],
  controllers: [SurveyController],
})
export class SurveyModule {}
