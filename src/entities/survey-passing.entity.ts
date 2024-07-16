import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Survey } from './survey.entity';
import { Answer } from './answer.entity';
import { Conflict } from './conflict.entity';
import { User } from './user.entity';

@Entity()
export class SurveyPassing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Survey, survey => survey.passings)
  survey: Survey;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Answer, answer => answer.passing)
  answers: Answer[];

  @OneToMany(() => Conflict, conflicts => conflicts.passing)
  conflicts: Conflict[];
}
