import { Component, OnInit } from '@angular/core';
import { Router }            from "@angular/router";
import { QuestionsService }  from '../../../services/questions.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

    constructor(private router: Router, private questionsService: QuestionsService) {
        this.router = router;
        this.questionsService = questionsService;
    }

    ngOnInit(): void {
    }

    startSurvey() {
        this.questionsService.startSurvey().subscribe(response => {
          this.router.navigateByUrl("/survey")
        })
    }
}
