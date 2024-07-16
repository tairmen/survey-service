import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Survey } from './survey.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => Survey, survey => survey.questions)
  survey: Survey;
}
