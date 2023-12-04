import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailTemplatesRoutingModule } from './email-templates-routing.module';
import { EmailTemplatesComponent } from './email-templates.component';
import { EmailTemplateTableComponent } from './email-template-table/email-template-table.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';


@NgModule({
  declarations: [
    EmailTemplatesComponent,
    EmailTemplateTableComponent
  ],
  imports: [
    CommonModule,
    EmailTemplatesRoutingModule,
    MaterialModule,
    SharedModule,
    MatBottomSheetModule
  ],
  exports:[
    EmailTemplatesComponent
  ]
})
export class EmailTemplatesModule { }
