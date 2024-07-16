import { Injectable } from '@nestjs/common';
import { CreateSurveyDto, UpdateSurveyDto, CreateAnswerDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from '../entities/survey.entity';
import { SurveyPassing } from '../entities/survey-passing.entity';
import { Answer } from '../entities/answer.entity';
import { Conflict } from '../entities/conflict.entity';
import { Question } from '../entities/question.entity';
import axios from 'axios';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(SurveyPassing)
    private readonly surveyPassingRepository: Repository<SurveyPassing>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(Conflict)
    private readonly conflictRepository: Repository<Conflict>,
    @InjectRepository(Conflict)
    private readonly questionRepository: Repository<Question>,
  ) {}

  findAll() {
    return this.surveyRepository.find({ relations: ['questions'] });
  }

  findOne(id: number) {
    return this.surveyRepository.findOne({ where: { id } , relations: ['questions'] });
  }

  create(createSurveyDto: CreateSurveyDto) {
    const survey = this.surveyRepository.create(createSurveyDto);
    return this.surveyRepository.save(survey);
  }

  update(id: number, updateSurveyDto: UpdateSurveyDto) {
    return this.surveyRepository.update(id, updateSurveyDto);
  }

  remove(id: number) {
    return this.surveyRepository.delete(id);
  }

  async createAnswers(id: number, createAnswerDto: CreateAnswerDto) {
    const surveyPassing = new SurveyPassing();
    surveyPassing.survey = await this.surveyRepository.findOne({ where: { id } });
    surveyPassing.answers = [];

    for (const answerDto of createAnswerDto.answers) {
      const answer = new Answer();
      answer.text = answerDto.text;
      answer.question = await this.questionRepository.findOne({ where: { id: answerDto.questionId } });
      surveyPassing.answers.push(answer);
    }

    await this.surveyPassingRepository.save(surveyPassing);

    const conflicts = await this.calculateConflicts(surveyPassing);

    return {
      surveyPassing,
      conflicts,
    };
  }

  private async calculateConflicts(surveyPassing: SurveyPassing) {
    const response = await axios.post('http://localhost:3001/calculate', surveyPassing);
    return response.data;
  }
}
