import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadLayoutComponent } from './lead-layout.component';
import { AddLeadComponent } from './dummy-add/add-lead.component';
import { LeadBottomPannelComponent } from './lead-bottom-pannel/lead-bottom-pannel.component';
import { ReferLeadComponent } from './refer-lead/refer-lead.component';

const routes: Routes = [
  {path:'',component:LeadLayoutComponent,children:[
    {path:'addLead',component:AddLeadComponent},
    {path:'leadBottomPanel',component:LeadBottomPannelComponent},
    {path:'refer-lead',component:ReferLeadComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadLayoutRoutingModule { }
