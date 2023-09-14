import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignComponent } from './campaign.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';

const routes: Routes = [
  {
    path:'', component:CampaignComponent, children:[
      {
        path:'list', component:CampaignListComponent
      },
      {
        path:'', redirectTo:'list', pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
