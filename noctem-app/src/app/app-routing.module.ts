import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GreetingModule }        from './components/survey/greeting/greeting.module';
import { MainComponent }         from './components/layout/main/main.component';
import { LayoutModule }          from './components/layout/layout.module';
import { SurveyModule }          from './components/survey/survey.module';
import { AdminModule }           from './components/admin/admin.module';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'survey', loadChildren: () => import('./components/survey/questions/questions.module').then(m => m.QuestionsModule) },
      { path: 'resume', loadChildren: () => import('./components/survey/questions/questions.module').then(m => m.QuestionsModule) },
      { path: 'greeting', loadChildren: () => import('./components/survey/greeting/greeting.module').then(m => m.GreetingModule) },
      { path: 'introduction', loadChildren: () => import('./components/survey/introduction/introduction.module').then(m => m.IntroductionModule) },
      { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
      { path: '', loadChildren: () => import('./components/survey/greeting/greeting.module').then(m => m.GreetingModule) }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
