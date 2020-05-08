import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';

import { AdminComponent }        from './admin.component';
import { EditSurveyComponent }   from './edit-survey.component';
import { AdminRoutingModule }    from './admin-routing.module';
import { SurveyLineItemModule }  from './survey-line-item/survey-line-item.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SurveyLineItemModule
  ],
  declarations: [AdminComponent, EditSurveyComponent]
})
export class AdminModule { 
}
