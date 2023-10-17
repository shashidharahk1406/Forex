import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TotalVerifiedEnquiriesComponent } from './total-verified-enquiries.component';
import { TotalVerifiedTableComponent } from './total-verified-table/total-verified-table.component';

const routes: Routes = [
  {
    path:'', component:TotalVerifiedEnquiriesComponent, children:[
      {
        path:'list', component:TotalVerifiedTableComponent
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
export class TotalVerifiedEnquiriesRoutingModule { }
