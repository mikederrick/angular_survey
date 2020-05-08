import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';

import { SurveyLineItemComponent }     from './survey-line-item.component';

@NgModule({
  imports: [
      CommonModule
  ],
  exports: [
      SurveyLineItemComponent
  ],
  declarations: [SurveyLineItemComponent]
})
export class SurveyLineItemModule { 
}
