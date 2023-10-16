import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailSentRoutingModule } from './email-sent-routing.module';
import { EmailSentComponent } from './email-sent.component';
import { EmailSentTableComponent } from './email-sent-table/email-sent-table.component';
import { EmailSentCardComponent } from './email-sent-card/email-sent-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { FilterListModule } from '../filter-list/filter-list.module';
import { DownloadEmailSentComponent } from './download-email-sent/download-email-sent.component';
import { EmailSmsDownloadComponent } from './email-sms-download/email-sms-download.component';
import { EmailSentMailComponent } from './email-sent-mail/email-sent-mail.component';
import { EmailSentWhatsappComponent } from './email-sent-whatsapp/email-sent-whatsapp.component';


@NgModule({
  declarations: [
    EmailSentComponent,
    EmailSentTableComponent,
    EmailSentCardComponent,
    DownloadEmailSentComponent,
    EmailSmsDownloadComponent,
    EmailSentMailComponent,
    EmailSentWhatsappComponent
  ],
  imports: [
    CommonModule,
    EmailSentRoutingModule,
    SharedModule,
    MaterialModule,
    FilterListModule
  ],
  exports:[
    EmailSentCardComponent
  ]
})
export class EmailSentModule { }
