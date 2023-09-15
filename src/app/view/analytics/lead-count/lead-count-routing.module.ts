import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadCountComponent } from './lead-count.component';
import { LeadCountTableComponent } from './lead-count-table/lead-count-table.component';

const routes: Routes = [
  {
    path:'', component:LeadCountComponent, children:[
      {
        path:'list', component:LeadCountTableComponent
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
export class LeadCountRoutingModule { }
