import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conflict } from '../entities/conflict.entity';

@Injectable()
export class ConflictService {
    constructor(
        @InjectRepository(Conflict)
        private readonly conflictRepository: Repository<Conflict>,
    ) { }

    async getConflicts(passingId?: number, surveyId?: number, userId?: number) {
        const queryBuilder = this.conflictRepository.createQueryBuilder('conflict')
            .innerJoinAndSelect('conflict.surveyPassing', 'surveyPassing')
            .innerJoinAndSelect('surveyPassing.survey', 'survey')
            .innerJoinAndSelect('surveyPassing.user', 'user');

        if (passingId) {
            queryBuilder.andWhere('surveyPassing.id = :passingId', { passingId });
        }

        if (surveyId) {
            queryBuilder.andWhere('survey.id = :surveyId', { surveyId });
        }

        if (userId) {
            queryBuilder.andWhere('user.id = :userId', { userId });
        }

        return queryBuilder.getMany();
    }

    findConflictById(id: number) {
        return this.conflictRepository.findOne({ where: { id }, relations: ['surveyPassing', 'surveyPassing.survey', 'surveyPassing.user'] });
    }
}