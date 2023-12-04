import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmsTemplatesRoutingModule } from './sms-templates-routing.module';
import { SmsTemplatesComponent } from './sms-templates.component';
import { SmsTemplateTableComponent } from './sms-template-table/sms-template-table.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AddSmsTemplateComponent } from './add-sms-template/add-sms-template.component';


@NgModule({
  declarations: [
    SmsTemplatesComponent,
    SmsTemplateTableComponent,
    AddSmsTemplateComponent
  ],
  imports: [
    CommonModule,
    SmsTemplatesRoutingModule,
    MaterialModule,
    SharedModule,
    MatBottomSheetModule
  ],
  exports:[
    SmsTemplatesComponent
  ]
})
export class SmsTemplatesModule { }
