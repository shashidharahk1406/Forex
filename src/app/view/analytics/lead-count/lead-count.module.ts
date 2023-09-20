import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadCountRoutingModule } from './lead-count-routing.module';
import { LeadCountComponent } from './lead-count.component';
import { LeadCountTableComponent } from './lead-count-table/lead-count-table.component';
import { LeadCountCardComponent } from './lead-count-card/lead-count-card.component';
import { FilterListModule } from '../filter-list/filter-list.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { DownloadLeadListComponent } from './download-lead-list/download-lead-list.component';
import { LeadCountSmsDownloadComponent } from './lead-count-sms-download/lead-count-sms-download.component';
import { LeadCountMailComponent } from './lead-count-mail/lead-count-mail.component';
import { LeadCountWhatsappComponent } from './lead-count-whatsapp/lead-count-whatsapp.component';


@NgModule({
  declarations: [
    LeadCountComponent,
    LeadCountTableComponent,
    LeadCountCardComponent,
    DownloadLeadListComponent,
    LeadCountSmsDownloadComponent,
    LeadCountMailComponent,
    LeadCountWhatsappComponent
  ],
  imports: [
    CommonModule,
    LeadCountRoutingModule,
    FilterListModule,
    SharedModule,
    MaterialModule
  ],
  exports:[
    LeadCountTableComponent,
    LeadCountCardComponent
  ]
})
export class LeadCountModule { }
