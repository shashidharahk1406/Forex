import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhatsappRoutingModule } from './whatsapp-routing.module';
import { WhatsappComponent } from './whatsapp.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { CreateNonEnterpriseTemplateComponent } from './create-non-enterprise-template/create-non-enterprise-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WhatsappFilterComponent } from './whatsapp-filter/whatsapp-filter.component';
import { CreateEnterpriseTemplateComponent } from './create-enterprise-template/create-enterprise-template.component';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { WhatsappTemplateDuplicateComponent } from './whatsapp-template-duplicate/whatsapp-template-duplicate.component';
import { WhatsappViewTemplateComponent } from './whatsapp-view-template/whatsapp-view-template.component';


@NgModule({
  declarations: [
    WhatsappComponent,
    TemplateListComponent,
    CreateNonEnterpriseTemplateComponent,
    WhatsappFilterComponent,
    CreateEnterpriseTemplateComponent,
    CreateTemplateComponent,
    EditTemplateComponent,
    WhatsappTemplateDuplicateComponent,
    WhatsappViewTemplateComponent
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
