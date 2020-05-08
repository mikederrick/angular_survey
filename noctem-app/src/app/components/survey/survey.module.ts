import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';

import { GreetingModule }       from './greeting/greeting.module';
import { QuestionsModule }      from './questions/questions.module';
import { IntroductionModule }   from './introduction/introduction.module';

@NgModule({
  imports: [
    CommonModule,
    GreetingModule,
    QuestionsModule,
    IntroductionModule
  ],
  declarations: []
})
export class SurveyModule { }
