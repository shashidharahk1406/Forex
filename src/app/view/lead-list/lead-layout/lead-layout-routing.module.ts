import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadLayoutComponent } from './lead-layout.component';
import { AddLeadComponent } from './add-lead/add-lead.component';

const routes: Routes = [
  {path:'',component:LeadLayoutComponent,children:[
    {path:'addLead',component:AddLeadComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadLayoutRoutingModule { }
