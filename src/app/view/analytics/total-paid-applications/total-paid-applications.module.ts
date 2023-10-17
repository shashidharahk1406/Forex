import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TotalPaidApplicationsRoutingModule } from './total-paid-applications-routing.module';
import { TotalPaidApplicationsComponent } from './total-paid-applications.component';
import { TotalPaidApplicationsTableComponent } from './total-paid-applications-table/total-paid-applications-table.component';
import { TotalPaidApplicationsCardComponent } from './total-paid-applications-card/total-paid-applications-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { FilterListModule } from '../filter-list/filter-list.module';
import { DownloadTotalPaidApplicationsComponent } from './download-total-paid-applications/download-total-paid-applications.component';
import { DownloadTotalPaidSmsDownloadComponent } from './download-total-paid-sms-download/download-total-paid-sms-download.component';
import { TotalPaidApplicationsMailComponent } from './total-paid-applications-mail/total-paid-applications-mail.component';
import { TotalPaidApplicationsWhatsappComponent } from './total-paid-applications-whatsapp/total-paid-applications-whatsapp.component';


@NgModule({
  declarations: [
    TotalPaidApplicationsComponent,
    TotalPaidApplicationsTableComponent,
    TotalPaidApplicationsCardComponent,
    DownloadTotalPaidApplicationsComponent,
    DownloadTotalPaidSmsDownloadComponent,
    TotalPaidApplicationsMailComponent,
    TotalPaidApplicationsWhatsappComponent
  ],
  imports: [
    CommonModule,
    TotalPaidApplicationsRoutingModule,
    SharedModule,
    MaterialModule,
    FilterListModule
  ],
  exports:[
    TotalPaidApplicationsCardComponent
  ]
})
export class TotalPaidApplicationsModule { }
