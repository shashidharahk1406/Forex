import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TotalReEnquiriesComponent } from './total-re-enquiries.component';
import { TotalReEnquiriesTableComponent } from './total-re-enquiries-table/total-re-enquiries-table.component';

const routes: Routes = [
  {
    path:'', component:TotalReEnquiriesComponent, children:[
      {
        path:'list', component:TotalReEnquiriesTableComponent
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
export class TotalReEnquiriesRoutingModule { }
