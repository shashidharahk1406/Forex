import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { LeadStagesComponent } from './lead-stages.component';
import { AddStagesComponent } from './add-stages/add-stages.component';
import { EditStageComponent } from './edit-stage/edit-stage.component';
import { LeadStageListComponent } from './lead-stage-list/lead-stage-list.component';
import { LeadStageRoutingModule } from './lead-stage-routing.module';


@NgModule({
  declarations: [
    LeadStagesComponent,
    AddStagesComponent,
    EditStageComponent,
    LeadStageListComponent
  ],
  imports: [
    CommonModule,
    LeadStageRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class LeadStagesModule { }
