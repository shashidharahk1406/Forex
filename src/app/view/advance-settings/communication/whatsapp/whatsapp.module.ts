import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhatsappRoutingModule } from './whatsapp-routing.module';
import { WhatsappComponent } from './whatsapp.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { CreateNonEnterpriseTemplateComponent } from './create-non-enterprise-template/create-non-enterprise-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WhatsappComponent,
    TemplateListComponent,
    CreateNonEnterpriseTemplateComponent
  ],
  imports: [
    CommonModule,
    WhatsappRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WhatsappModule { }