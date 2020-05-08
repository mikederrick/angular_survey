import { Component, OnInit }         from '@angular/core';
import { Router, ActivatedRoute }    from "@angular/router";
import { QuestionsService }          from '../../../services/questions.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss']
})
export class GreetingComponent implements OnInit {

    showResume: boolean       = false;

    constructor(private router: Router,
                private questionsService: QuestionsService,
                private route: ActivatedRoute) {
        this.router           = router;
        this.questionsService = questionsService;
        route.params.subscribe(val => {
          this.questionsService.currentSurvey().subscribe(response => {
              if (response['survey']) {
                  this.showResume = true;
              } else {
                  this.router.navigateByUrl("/introduction");
              }
          })
        });
    }

    ngOnInit(): void {
    }

    takeSurvey() {
        this.questionsService.startSurvey().subscribe(response => {
          this.router.navigateByUrl("/introduction")
        })
    }

    resumeSurvey() {
        this.router.navigateByUrl("/resume")
    }
}
