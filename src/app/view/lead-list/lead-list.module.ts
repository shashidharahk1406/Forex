import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadListRoutingModule } from './lead-list-routing.module';
import { LeadListComponent } from './lead-list.component';



@NgModule({
  declarations: [
    LeadListComponent
  ],
  imports: [
    CommonModule,
    LeadListRoutingModule
  ]
})
export class LeadListModule { }
