import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TotalEnrollmentsComponent } from './total-enrollments.component';
import { TotalEnrollmentsTableComponent } from './total-enrollments-table/total-enrollments-table.component';

const routes: Routes = [
  {
    path:'', component:TotalEnrollmentsComponent, children:[
      {
        path:'list', component:TotalEnrollmentsTableComponent
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
export class TotalEnrollmentsRoutingModule { }
