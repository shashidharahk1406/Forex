import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TotalApplicantsRoutingModule } from './total-applicants-routing.module';
import { TotalApplicantsComponent } from './total-applicants.component';
import { TotalApplicantsListComponent } from './total-applicants-list/total-applicants-list.component';
import { TotalApplicantsCardComponent } from './total-applicants-card/total-applicants-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { FilterListModule } from '../filter-list/filter-list.module';
import { DownloadTotalApplicantsComponent } from './download-total-applicants/download-total-applicants.component';
import { TotalApplicantsSmsDownloadComponent } from './total-applicants-sms-download/total-applicants-sms-download.component';
import { TotalApplicantsMailComponent } from './total-applicants-mail/total-applicants-mail.component';
import { TotalApplicantsWhatsappComponent } from './total-applicants-whatsapp/total-applicants-whatsapp.component';


@NgModule({
  declarations: [
    TotalApplicantsComponent,
    TotalApplicantsListComponent,
    TotalApplicantsCardComponent,
    DownloadTotalApplicantsComponent,
    TotalApplicantsSmsDownloadComponent,
    TotalApplicantsMailComponent,
    TotalApplicantsWhatsappComponent
  ],
  imports: [
    CommonModule,
    TotalApplicantsRoutingModule,
    SharedModule,
    MaterialModule,
    FilterListModule
  ],
  exports:[
    TotalApplicantsCardComponent
  ]
})
export class TotalApplicantsModule { }
