import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { ConflictService } from './conflicts.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('survey')
@UseGuards(AuthGuard('jwt'))
export class ConflictController {
  constructor(private readonly conflictService: ConflictService) {}

  @Get('conflicts')
  getConflicts(@Query('passing_id') passingId: string, @Query('survey_id') surveyId: string, @Query('user_id') userId: string) {
    return this.conflictService.getConflicts(
      passingId ? +passingId : undefined,
      surveyId ? +surveyId : undefined,
      userId ? +userId : undefined,
    );
  }

  @Get('conflicts/:id')
  getConflict(@Param('id') id: string) {
    return this.conflictService.findConflictById(+id);
  }
}