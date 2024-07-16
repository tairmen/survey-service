import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Question } from './question.entity';
import { SurveyPassing } from './survey-passing.entity';

@Entity()
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Question, question => question.survey)
  questions: Question[];

  @OneToMany(() => SurveyPassing, passing => passing.survey)
  passings: SurveyPassing[];
}