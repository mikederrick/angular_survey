import { NgModule }              from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { AdminComponent }        from './admin.component';
import { EditSurveyComponent }   from './edit-survey.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'surveys/:uuid', component: EditSurveyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
