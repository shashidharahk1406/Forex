import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FailedLeadsRoutingModule } from './failed-leads-routing.module';
import { FailedLeadsComponent } from './failed-leads.component';



@NgModule({
  declarations: [
    FailedLeadsComponent
  ],
  imports: [
    CommonModule,
    FailedLeadsRoutingModule
  ]
})
export class FailedLeadsModule { }
