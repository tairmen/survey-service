export class CreateSurveyDto {
    readonly title: string;
    readonly questions: { text: string }[];
}

export class UpdateSurveyDto {
    readonly title?: string;
    readonly questions?: { text: string }[];
}

export class CreateAnswerDto {
    readonly answers: { questionId: number; text: string }[];
}

export class ConflictDto {
    readonly description: string;
}

export class AnswersDto {
    readonly answer: string;
    readonly question: string;
}

export class SurveyPassingDto {
    readonly answers: AnswersDto[];
    id?: string;
}

export class ConflictServiceResponseDto {
    readonly reason: string;
    readonly info?: string;
    readonly id?: number;
    readonly createdAt?: Date;
}