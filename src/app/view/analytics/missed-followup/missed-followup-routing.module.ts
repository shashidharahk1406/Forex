import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissedFollowupComponent } from './missed-followup.component';
import { MissedFollowupTableComponent } from './missed-followup-table/missed-followup-table.component';

const routes: Routes = [
  {
    path:'', component:MissedFollowupComponent, children:[
      {
        path:'list', component:MissedFollowupTableComponent
      },
      {
        path:'', redirectTo:"list", pathMatch:'full'     
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissedFollowupRoutingModule { }
