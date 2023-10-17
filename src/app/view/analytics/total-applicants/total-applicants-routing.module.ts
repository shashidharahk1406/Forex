import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TotalApplicantsComponent } from './total-applicants.component';
import { TotalApplicantsListComponent } from './total-applicants-list/total-applicants-list.component';

const routes: Routes = [
  {
    path:'', component:TotalApplicantsComponent, children:[
      {
        path:'list', component: TotalApplicantsListComponent
      },
      {
        path:'', redirectTo:'list', pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TotalApplicantsRoutingModule { }
