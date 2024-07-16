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
