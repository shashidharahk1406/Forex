import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';
import { EditCampaignComponent } from './edit-campaign/edit-campaign.component';
import { CampaignComponent } from './campaign.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    CampaignListComponent,
    AddCampaignComponent,
    EditCampaignComponent,
    CampaignComponent
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,
     SharedModule, MaterialModule
  ]
})
export class CampaignModule { }
