import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmsSentRoutingModule } from './sms-sent-routing.module';
import { SmsSentComponent } from './sms-sent.component';
import { SmsSentTableComponent } from './sms-sent-table/sms-sent-table.component';
import { SmsSentCardComponent } from './sms-sent-card/sms-sent-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { FilterListModule } from '../filter-list/filter-list.module';
import { DownloadSmsSentComponent } from './download-sms-sent/download-sms-sent.component';
import { SmsSentSmsComponent } from './sms-sent-sms/sms-sent-sms.component';
import { SmsSentEmailComponent } from './sms-sent-email/sms-sent-email.component';
import { SmsSentWhatsappComponent } from './sms-sent-whatsapp/sms-sent-whatsapp.component';


@NgModule({
  declarations: [
    SmsSentComponent,
    SmsSentTableComponent,
    SmsSentCardComponent,
    DownloadSmsSentComponent,
    SmsSentSmsComponent,
    SmsSentEmailComponent,
    SmsSentWhatsappComponent
  ],
  imports: [
    CommonModule,
    SmsSentRoutingModule,
    SharedModule,
    MaterialModule, 
    FilterListModule
  ],
  exports:[
    SmsSentCardComponent
  ]
})
export class SmsSentModule { }
