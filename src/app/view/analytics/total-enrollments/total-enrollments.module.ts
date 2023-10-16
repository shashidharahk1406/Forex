import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TotalEnrollmentsRoutingModule } from './total-enrollments-routing.module';
import { TotalEnrollmentsComponent } from './total-enrollments.component';
import { TotalEnrollmentsTableComponent } from './total-enrollments-table/total-enrollments-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { FilterListModule } from '../filter-list/filter-list.module';
import { TotalEnrollmentsCardComponent } from './total-enrollments-card/total-enrollments-card.component';
import { DownloadTotalEnrollmentsComponent } from './download-total-enrollments/download-total-enrollments.component';
import { TotalEnrollmentsSmsDownloadComponent } from './total-enrollments-sms-download/total-enrollments-sms-download.component';
import { TotalEnrollmentsMailComponent } from './total-enrollments-mail/total-enrollments-mail.component';
import { TotalEnrollmentsWhatsappComponent } from './total-enrollments-whatsapp/total-enrollments-whatsapp.component';


@NgModule({
  declarations: [
    TotalEnrollmentsComponent,
    TotalEnrollmentsTableComponent,
    TotalEnrollmentsCardComponent,
    DownloadTotalEnrollmentsComponent,
    TotalEnrollmentsSmsDownloadComponent,
    TotalEnrollmentsMailComponent,
    TotalEnrollmentsWhatsappComponent
  ],
  imports: [
    CommonModule,
    TotalEnrollmentsRoutingModule,
    SharedModule, 
    MaterialModule, 
    FilterListModule
  ],
  exports:[
    TotalEnrollmentsCardComponent
  ]
})
export class TotalEnrollmentsModule { }
