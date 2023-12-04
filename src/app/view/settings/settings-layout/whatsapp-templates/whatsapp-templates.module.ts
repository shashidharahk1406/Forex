import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhatsappTemplatesRoutingModule } from './whatsapp-templates-routing.module';
import { WhatsappTemplatesComponent } from './whatsapp-templates.component';
import { WhatsappTemplateTableComponent } from './whatsapp-template-table/whatsapp-template-table.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AddWhatsappTemplateComponent } from './add-whatsapp-template/add-whatsapp-template.component';


@NgModule({
  declarations: [
    WhatsappTemplatesComponent,
    WhatsappTemplateTableComponent,
    AddWhatsappTemplateComponent
  ],
  imports: [
    CommonModule,
    WhatsappTemplatesRoutingModule,
    MaterialModule,
    SharedModule,
    MatBottomSheetModule
  ],
  exports:[
    WhatsappTemplatesComponent
  ]
})
export class WhatsappTemplatesModule { }
