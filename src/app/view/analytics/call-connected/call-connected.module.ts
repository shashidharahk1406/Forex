import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallConnectedRoutingModule } from './call-connected-routing.module';
import { CallConnectedComponent } from './call-connected.component';
import { CallConnectedTableComponent } from './call-connected-table/call-connected-table.component';
import { CallConnectedCardComponent } from './call-connected-card/call-connected-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { FilterListModule } from '../filter-list/filter-list.module';
import { DownloadCallConnectedComponent } from './download-call-connected/download-call-connected.component';
import { CallConnectedSmsComponent } from './call-connected-sms/call-connected-sms.component';
import { CallConnectedMailComponent } from './call-connected-mail/call-connected-mail.component';
import { CallConnectedWhatsappComponent } from './call-connected-whatsapp/call-connected-whatsapp.component';


@NgModule({
  declarations: [
    CallConnectedComponent,
    CallConnectedTableComponent,
    CallConnectedCardComponent,
    DownloadCallConnectedComponent,
    CallConnectedSmsComponent,
    CallConnectedMailComponent,
    CallConnectedWhatsappComponent
  ],
  imports: [
    CommonModule,
    CallConnectedRoutingModule,
    SharedModule,
    MaterialModule,
    FilterListModule
  ],
  exports:[
    CallConnectedCardComponent
  ]
})
export class CallConnectedModule { }
