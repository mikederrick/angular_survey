import {QuestionOption} from "./question-option.model";

export class Question {
  id: number;
  title: string;
  options: QuestionOption[];
}