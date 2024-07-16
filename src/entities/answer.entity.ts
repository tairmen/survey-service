import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SurveyPassing } from './survey-passing.entity';
import { Question } from './question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => SurveyPassing, passing => passing.answers)
  passing: SurveyPassing;

  @ManyToOne(() => Question)
  question: Question;
}
