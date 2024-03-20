import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestReportRoutingModule } from './request-report-routing.module';
import { RequestReportComponent } from './request-report.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    RequestReportComponent,
    ReportFormComponent
  ],
  imports: [
    CommonModule,
    RequestReportRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class RequestReportModule { }
