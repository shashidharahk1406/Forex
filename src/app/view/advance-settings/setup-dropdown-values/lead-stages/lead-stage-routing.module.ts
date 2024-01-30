import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadStagesComponent } from './lead-stages.component';
import { LeadStageListComponent } from './lead-stage-list/lead-stage-list.component';


const routes: Routes = [
  {
    path:'', component:LeadStagesComponent, children:[
      {
        path:'stage-list', component:LeadStageListComponent
      },
      {
        path:'', redirectTo:'stage-list', pathMatch:'full'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadStageRoutingModule { }
