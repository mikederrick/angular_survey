import { Injectable }              from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Survey }                  from '../models/survey.model';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(private http: HttpClient) {
      this.http = http;
  }

  delete(survey: Survey) {
      return this.http.delete(`/api/surveys/${survey.uuid}`);
  }

  retrieveByUUID(uuid: string) {
      return this.http.get(`/api/surveys/${uuid}`); 
  }

  setAnswersByUUID(uuid: string, answers: Map<string, number>) {
      return this.http.put(`/api/surveys/${uuid}`, answers); 
  }

  all() {
      return this.http.get('/api/surveys');
  }
}
