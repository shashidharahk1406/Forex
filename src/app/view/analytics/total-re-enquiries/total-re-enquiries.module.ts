import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TotalReEnquiriesRoutingModule } from './total-re-enquiries-routing.module';
import { TotalReEnquiriesComponent } from './total-re-enquiries.component';
import { TotalReEnquiriesTableComponent } from './total-re-enquiries-table/total-re-enquiries-table.component';
import { TotalReEnquiriesCardComponent } from './total-re-enquiries-card/total-re-enquiries-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { FilterListModule } from '../filter-list/filter-list.module';
import { DownloadTotalReEnquiriesComponent } from './download-total-re-enquiries/download-total-re-enquiries.component';
import { TotalReEnquiriesSmsDownloadComponent } from './total-re-enquiries-sms-download/total-re-enquiries-sms-download.component';
import { TotalReEnquiriesMailComponent } from './total-re-enquiries-mail/total-re-enquiries-mail.component';
import { TotalReEnquiriesWhatsappComponent } from './total-re-enquiries-whatsapp/total-re-enquiries-whatsapp.component';


@NgModule({
  declarations: [
    TotalReEnquiriesComponent,
    TotalReEnquiriesTableComponent,
    TotalReEnquiriesCardComponent,
    DownloadTotalReEnquiriesComponent,
    TotalReEnquiriesSmsDownloadComponent,
    TotalReEnquiriesMailComponent,
    TotalReEnquiriesWhatsappComponent
  ],
  imports: [
    CommonModule,
    TotalReEnquiriesRoutingModule,
    SharedModule,
    MaterialModule,
    FilterListModule
  ],
  exports:[
    TotalReEnquiriesCardComponent
  ]
})
export class TotalReEnquiriesModule { }
