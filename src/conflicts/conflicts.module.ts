import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConflictService } from './conflicts.service';
import { ConflictController } from './conflicts.controller';
import { Conflict } from '../entities/conflict.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conflict, User]),
  ],
  providers: [ConflictService],
  controllers: [ConflictController],
})
export class ConflictModule {}
