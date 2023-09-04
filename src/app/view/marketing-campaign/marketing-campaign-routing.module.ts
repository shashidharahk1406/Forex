import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MarketingCampaignComponent } from './marketing-campaign.component';

const routes: Routes = [
  { path: '', component: MarketingCampaignComponent },
 ];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class MarketingCampaignRoutingModule { }
