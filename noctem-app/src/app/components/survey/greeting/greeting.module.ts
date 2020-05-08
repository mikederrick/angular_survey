import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';

import { GreetingComponent }     from './greeting.component';
import { GreetingRoutingModule } from './greeting-routing.module';

@NgModule({
  imports: [
    CommonModule,
    GreetingRoutingModule
  ],
  declarations: [GreetingComponent]
})
export class GreetingModule { 
}
