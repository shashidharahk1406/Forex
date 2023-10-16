import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TotalVerifiedEnquiriesRoutingModule } from './total-verified-enquiries-routing.module';
import { TotalVerifiedEnquiriesComponent } from './total-verified-enquiries.component';
import { TotalVerifiedTableComponent } from './total-verified-table/total-verified-table.component';
import { TotalVerifiedEnquiriesCardComponent } from './total-verified-enquiries-card/total-verified-enquiries-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { FilterListModule } from '../filter-list/filter-list.module';
import { DownloadTotalVerifiedEnquiriesComponent } from './download-total-verified-enquiries/download-total-verified-enquiries.component';
import { TotalVerifiedEnquiriesSmsDownloadComponent } from './total-verified-enquiries-sms-download/total-verified-enquiries-sms-download.component';
import { TotalVerifiedEnquiriesMailComponent } from './total-verified-enquiries-mail/total-verified-enquiries-mail.component';
import { TotalVerifiedEnquiriesWhatsappComponent } from './total-verified-enquiries-whatsapp/total-verified-enquiries-whatsapp.component';


@NgModule({
  declarations: [
    TotalVerifiedEnquiriesComponent,
    TotalVerifiedTableComponent,
    TotalVerifiedEnquiriesCardComponent,
    DownloadTotalVerifiedEnquiriesComponent,
    TotalVerifiedEnquiriesSmsDownloadComponent,
    TotalVerifiedEnquiriesMailComponent,
    TotalVerifiedEnquiriesWhatsappComponent
  ],
  imports: [
    CommonModule,
    TotalVerifiedEnquiriesRoutingModule,
    SharedModule,
    MaterialModule,
    FilterListModule
  ],
  exports:[
    TotalVerifiedEnquiriesCardComponent
  ]
})
export class TotalVerifiedEnquiriesModule { }
