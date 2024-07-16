import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SurveyPassing } from './survey-passing.entity';

@Entity()
export class Conflict {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => SurveyPassing, passing => passing.conflicts)
  passing: SurveyPassing;
}
