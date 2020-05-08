import { Injectable }              from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) {
      this.http = http;
  }

  all() {
      return this.http.get('/api/questions');
  }

  startSurvey() {
      return this.http.post('/api/surveys', {});
  }

  currentSurvey() {
      return this.http.get('/api/surveys/current');
  }

  saveCurrentSurvey(surveyAnswers: Map<number, number>) {
      return this.http.post('/api/surveys/current', this.mapToJson(surveyAnswers));
  }
  
  markSurveyComplete() {
    return this.http.post('/api/surveys/current/complete', {});
  }

  mapToJson(map: Map<any, any>) {
    let json = {};
    map.forEach((v,k) => {
      json[k] = v;
    })
    return json;
  }
}
