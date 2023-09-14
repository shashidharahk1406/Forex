import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewChannelComponent } from './new-channel.component';
import { NewChannelListComponent } from './new-channel-list/new-channel-list.component';

const routes: Routes = [
  {
    path:'', component:NewChannelComponent, children:[
      {
        path:'list', component:NewChannelListComponent
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
export class NewChannelRoutingModule { }
