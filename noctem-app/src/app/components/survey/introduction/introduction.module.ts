import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';

import { IntroductionComponent }     from './introduction.component';
import { IntroductionRoutingModule } from './introduction-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IntroductionRoutingModule
  ],
  declarations: [IntroductionComponent]
})
export class IntroductionModule { 
}
