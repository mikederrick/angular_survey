import { Component, Input, Output, EventEmitter }  from '@angular/core';
import { Survey }                                          from '../../../models/survey.model';

@Component({
  selector: 'survey-line-item',
  templateUrl: './survey-line-item.component.html',
  styleUrls: ['./survey-line-item.component.scss']
})
export class SurveyLineItemComponent {

  @Input()
  survey: Survey;

  // naming maybe just "delete"
  @Output()
  delete: EventEmitter<void> = new EventEmitter();

  deleteSurvey() {
    this.delete.emit();
  }

  total() {
    if (this.survey.answers) {
        let total = 0;
        Object.entries(this.survey.answers).forEach(entry => {
            total += entry[1];
        })
        return total;
    }
    return 0;
  }

  category() {
    if (this.survey.answers) {
        let total = 0;
        Object.entries(this.survey.answers).forEach(entry => total += entry[1]);

        if (!this.survey.complete) {
          return "Survey Not Completed";
        } else if (total <= 7) {
          return "No clinically significant insomnia";
        } else if (total <= 14) {
          return "Subthreshold insomnia";
        } else if (total <= 21) {
          return "Clinical insomnia (moderate severity)";
        } else {
          return "Clinical insomnia (severe)";
        }
    } else {
        return "Survey not complete";
    }
  }
}
