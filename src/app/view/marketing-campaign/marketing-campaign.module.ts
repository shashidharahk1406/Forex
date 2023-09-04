import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingCampaignRoutingModule } from './marketing-campaign-routing.module';
import { MarketingCampaignComponent } from './marketing-campaign.component';

@NgModule({
  declarations: [
    MarketingCampaignComponent
  ],
  imports: [
    CommonModule,
    MarketingCampaignRoutingModule
  ]
})
export class MarketingCampaignModule { }
