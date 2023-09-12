import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './channel.component';
import { AddChannelComponent } from './add-channel/add-channel.component';
import { ChannelListComponent } from './channel-list/channel-list.component';

const routes: Routes = [
  {
    path:'', component:ChannelComponent, children:[
      {
        path:'list', component:ChannelListComponent
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
export class ChannelRoutingModule { }
