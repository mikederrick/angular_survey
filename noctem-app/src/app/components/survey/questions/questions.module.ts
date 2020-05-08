import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';

import { QuestionsComponent }     from './questions.component';
import { QuestionsRoutingModule } from './questions-routing.module';

@NgModule({
  imports: [
    CommonModule,
    QuestionsRoutingModule
  ],
  declarations: [QuestionsComponent]
})
export class QuestionsModule {
}
