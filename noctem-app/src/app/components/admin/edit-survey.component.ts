import { Component, OnInit }   from '@angular/core';
import { SurveysService }      from '../../services/surveys.service';
import { QuestionsService }    from '../../services/questions.service';
import { Survey }              from '../../models/survey.model';
import { Question }            from '../../models/question.model';
import { ActivatedRoute }      from '@angular/router';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.scss']
})
export class EditSurveyComponent implements OnInit  {

    survey:    Survey;
    questions: Question[] = [];

    constructor(private route: ActivatedRoute,
                private surveysService: SurveysService,
                private questionsService: QuestionsService) {
        this.route = route;
        this.surveysService = surveysService;
    }

    ngOnInit() {
        this.fetchSurvey();
    }

    fetchSurvey() {
        let uuid = this.route.snapshot.paramMap.get('uuid');
        this.surveysService.retrieveByUUID(uuid).subscribe((response: any) => {
            this.survey = response['survey'];
            this.fetchQuestions();
        })
    }

    fetchQuestions() {
        this.questionsService.all()
            .subscribe((response: Question[]) => {
                  this.questions = response;
              })
    }

    renderAnswerClasses(question, option) {
        let answer = this.survey.answers[question.id];
        return option.value === answer ? "selected" : "default";
    }

    answerQuestion(question, option) {
        this.survey.answers[question.id] = option.value;
        this.surveysService.setAnswersByUUID(this.survey.uuid, this.survey.answers).subscribe((response: any) => {
        })
    }
}
