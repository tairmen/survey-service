import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateSurveyDto, UpdateSurveyDto, CreateAnswerDto, ConflictDto, SurveyPassingDto, ConflictServiceResponseDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from '../entities/survey.entity';
import { SurveyPassing } from '../entities/survey-passing.entity';
import { Answer } from '../entities/answer.entity';
import { Conflict } from '../entities/conflict.entity';
import { Question } from '../entities/question.entity';
import { User } from '../entities/user.entity';
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
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Conflict)
    private readonly conflictRepository: Repository<Conflict>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) { }

  findAll() {
    return this.surveyRepository.find({ relations: ['questions'] });
  }

  findOne(id: number) {
    return this.surveyRepository.findOne({ where: { id }, relations: ['questions'] });
  }

  async create(createSurveyDto: CreateSurveyDto) {
    const survey = this.surveyRepository.create({
      title: createSurveyDto.title,
    });

    const savedSurvey = await this.surveyRepository.save(survey);

    for (const questionDto of createSurveyDto.questions) {
      const question = this.questionRepository.create({
        text: questionDto.text,
        survey: savedSurvey,
      });
      await this.questionRepository.save(question);
    }

    return this.findOne(savedSurvey.id);
  }

  update(id: number, updateSurveyDto: UpdateSurveyDto) {
    return this.surveyRepository.update(id, updateSurveyDto);
  }

  remove(id: number) {
    return this.surveyRepository.delete(id);
  }

  async createAnswers(id: number, createAnswerDto: CreateAnswerDto, userId: number) {
    const surveyPassing = new SurveyPassing();
    surveyPassing.survey = await this.surveyRepository.findOne({ where: { id }, relations: ['questions'] });
    surveyPassing.answers = [];
    const questions = surveyPassing.survey.questions;
    delete surveyPassing.survey.questions;
    surveyPassing.user = await this.userRepository.findOne({ where: { id: userId }, select: ["id", "username"] })

    const externalServiceReqData: SurveyPassingDto = {
      answers: []
    }

    for (const answerDto of createAnswerDto.answers) {
      const answer = new Answer();
      answer.text = answerDto.text;
      answer.question = questions.find(question => question.id == answerDto.questionId);
      if (!answer.question) {
        throw new HttpException(`Question with ID ${answerDto.questionId} not found in this survey`, HttpStatus.BAD_REQUEST);
      }
      surveyPassing.answers.push(answer);
      externalServiceReqData.answers.push({
        answer: answer.text,
        question: answer.question.text
      })
    }

    const savedSurveyPassing = await this.surveyPassingRepository.save(surveyPassing);

    externalServiceReqData.id = savedSurveyPassing.id.toString()

    const conflicts: ConflictDto[] = await this.calculateConflicts(externalServiceReqData);

    return {
      surveyPassing,
      conflicts,
    };
  }

  private async calculateConflicts(surveyPassing: SurveyPassingDto): Promise<ConflictDto[]> {

    const response = await axios.post(process.env.CONFLICT_SERVICE_URL, surveyPassing);

    const conflicts = response.data.map((el: ConflictServiceResponseDto) => {
      return {
        description: el.reason
      }
    })
    return conflicts;

    // return [
    //   {
    //     description: 'Conflict: Answer to question 2 is "no"',
    //   }
    // ]
  }
}
