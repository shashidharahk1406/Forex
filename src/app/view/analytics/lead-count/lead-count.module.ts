import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadCountRoutingModule } from './lead-count-routing.module';
import { LeadCountComponent } from './lead-count.component';
import { LeadCountTableComponent } from './lead-count-table/lead-count-table.component';
import { LeadCountCardComponent } from './lead-count-card/lead-count-card.component';


@NgModule({
  declarations: [
    LeadCountComponent,
    LeadCountTableComponent,
    LeadCountCardComponent
  ],
  imports: [
    CommonModule,
    LeadCountRoutingModule
  ],
  exports:[
    LeadCountTableComponent,
    LeadCountCardComponent
  ]
})
export class LeadCountModule { }
