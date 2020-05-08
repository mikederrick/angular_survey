import { Component, OnInit }         from '@angular/core';
import { SurveysService }            from '../../services/surveys.service';
import { Survey }                    from '../../models/survey.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./survey-line-item/survey-line-item.component.scss']
})
export class AdminComponent implements OnInit {

  surveys: Survey[] = [];

  constructor(private surveysService: SurveysService) {
      this.surveysService = surveysService;
  }

  deleteElement(index) {
    this.surveysService.delete(this.surveys[index]).subscribe(() => {
      this.requestSurveys();
    })
  }

  ngOnInit(): void {
    this.requestSurveys();
  }

  requestSurveys() {
    this.surveysService.all().subscribe((response: Survey[]) => {
      this.surveys = response;
    })
  }
}
