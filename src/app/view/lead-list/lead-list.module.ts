import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadListRoutingModule } from './lead-list-routing.module';
import { LeadListComponent } from './lead-list.component';
import { LeadLayoutModule } from './lead-layout/lead-layout.module';


@NgModule({
  declarations: [
    LeadListComponent,
  ],
  imports: [
    CommonModule,
    LeadListRoutingModule,
    LeadLayoutModule
  ]
})
export class LeadListModule { }
