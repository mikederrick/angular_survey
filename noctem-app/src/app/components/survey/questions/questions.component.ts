import { Component, OnInit } from '@angular/core';
import { QuestionsService }  from '../../../services/questions.service';
import { Question }          from '../../../models/question.model';
import { Router }            from "@angular/router";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  questions: Question[]          = [];
  currentQuestion: Question      = null;
  currentQuestionIndex: number   = 0;
  showBack: boolean              = false;
  showNext: boolean              = false;
  answerMap: Map<number,number>  = new Map();
  surveyComplete: boolean        = false;
  surveyResultCategory: string   = "";

  constructor(private router: Router, private questionsService: QuestionsService) {
      this.router = router;
      this.questionsService = questionsService;
  }

  ngOnInit(): void {
      this.questionsService.all()
        .subscribe((response: Question[]) => {
              this.questions = response;

              if (this.questions.length > 0) {
                this.currentQuestion = this.questions[0];
                this.currentQuestionIndex = 0;
              }
          })
        this.fetchExistingSurvey();
  }

  fetchExistingSurvey() {
        if (this.router.url === "/resume") {
                this.questionsService.currentSurvey().subscribe(response => {
                 if (response['survey']) {
                   Object.keys(response['survey']['answers']).forEach(key => {
                     this.answerMap.set(parseInt(key), response['survey']['answers'][key]);
                     this.showNext = !!this.answerMap.has(this.currentQuestionIndex);
                   })
                 }
            })
        }
  }

  answerQuestion(event, option) {
    if (this.answerMap.get(this.currentQuestionIndex) !== option.value) {
      this.answerMap.set(this.currentQuestionIndex, option.value)
    } else {
      this.answerMap.set(this.currentQuestionIndex, option.value)
    }
    this.questionsService.saveCurrentSurvey(this.answerMap).subscribe(results => {
      console.log('Survey saved...');
    });

    this.showNext = true;
  }

  renderAnswerClasses(option) {
    return option.value === this.answerMap.get(this.currentQuestionIndex) ? "selected" : "default";
  }

  back() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex -= 1;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.showNext = !!this.answerMap.has(this.currentQuestionIndex);
      this.showBack = this.currentQuestionIndex > 0;
    }
  }

  next() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex += 1;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.showNext = !!this.answerMap.has(this.currentQuestionIndex);
      this.showBack = this.currentQuestionIndex > 0;
    } else {
      this.surveyComplete = true;
      this.surveyResultCategory = this.getResultsCategory();
      this.questionsService.markSurveyComplete().subscribe(results => {
        console.log('Survey saved...');
      });;
    }
  }

  exit() {
    this.router.navigateByUrl("/")
  }

  getResultsCategory() {
    let total = 0;
    this.answerMap.forEach((v, k) => total += v);

    if (total <= 7) {
      return "No clinically significant insomnia";
    } else if (total <= 14) {
      return "Subthreshold insomnia";
    } else if (total <= 21) {
      return "Clinical insomnia (moderate severity)";
    } else {
      return "Clinical insomnia (severe)";
    }
  }
}
