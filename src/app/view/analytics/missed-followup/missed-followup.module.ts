import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissedFollowupRoutingModule } from './missed-followup-routing.module';
import { MissedFollowupComponent } from './missed-followup.component';
import { MissedFollowupTableComponent } from './missed-followup-table/missed-followup-table.component';
import { MissedFollowupCardComponent } from './missed-followup-card/missed-followup-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { FilterListModule } from '../filter-list/filter-list.module';
import { DownloadMissedFollowupComponent } from './download-missed-followup/download-missed-followup.component';
import { MissedFollowupSmsComponent } from './missed-followup-sms/missed-followup-sms.component';
import { MissedFollowupMailComponent } from './missed-followup-mail/missed-followup-mail.component';
import { MissedFollowupWhatsappComponent } from './missed-followup-whatsapp/missed-followup-whatsapp.component';


@NgModule({
  declarations: [
    MissedFollowupComponent,
    MissedFollowupTableComponent,
    MissedFollowupCardComponent,
    DownloadMissedFollowupComponent,
    MissedFollowupSmsComponent,
    MissedFollowupMailComponent,
    MissedFollowupWhatsappComponent
  ],
  imports: [
    CommonModule,
    MissedFollowupRoutingModule,
    SharedModule, 
    MaterialModule,
    FilterListModule
  ],
  exports:[
    MissedFollowupCardComponent
  ]
})
export class MissedFollowupModule { }
