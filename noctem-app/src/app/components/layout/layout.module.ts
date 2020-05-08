import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { MainComponent }        from './main/main.component';
import { HeaderComponent }      from './header/header.component';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [],
  declarations: [
    MainComponent,
    HeaderComponent
  ]
})
export class LayoutModule { }
