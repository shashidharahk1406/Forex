import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisteredApplicationsRoutingModule } from './registered-applications-routing.module';
import { RegisteredApplicationsComponent } from './registered-applications.component';
import { RegisteredApplicationTableComponent } from './registered-application-table/registered-application-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { FilterListModule } from '../filter-list/filter-list.module';
import { RegisteredApplicationCardComponent } from './registered-application-card/registered-application-card.component';
import { DownloadRegisteredApplicationComponent } from './download-registered-application/download-registered-application.component';
import { RegisteredApplicationSmsDownloadComponent } from './registered-application-sms-download/registered-application-sms-download.component';
import { RegisteredApplicationMailComponent } from './registered-application-mail/registered-application-mail.component';
import { RegisteredApplicationWhatsappComponent } from './registered-application-whatsapp/registered-application-whatsapp.component';


@NgModule({
  declarations: [
    RegisteredApplicationsComponent,
    RegisteredApplicationTableComponent,
    RegisteredApplicationCardComponent,
    DownloadRegisteredApplicationComponent,
    RegisteredApplicationSmsDownloadComponent,
    RegisteredApplicationMailComponent,
    RegisteredApplicationWhatsappComponent
  ],
  imports: [
    CommonModule,
    RegisteredApplicationsRoutingModule,
    SharedModule,
    MaterialModule,
    FilterListModule
  ],
  exports:[
    RegisteredApplicationCardComponent
  ]
})
export class RegisteredApplicationsModule { }
