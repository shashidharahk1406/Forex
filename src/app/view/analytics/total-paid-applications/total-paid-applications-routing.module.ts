import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TotalPaidApplicationsComponent } from './total-paid-applications.component';
import { TotalPaidApplicationsTableComponent } from './total-paid-applications-table/total-paid-applications-table.component';

const routes: Routes = [
  {
    path:'', component:TotalPaidApplicationsComponent, children:[
      {
        path:'list',component:TotalPaidApplicationsTableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TotalPaidApplicationsRoutingModule { }
