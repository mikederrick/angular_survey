export class Survey {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  complete: boolean;
  answers: Map<string, number>;
}