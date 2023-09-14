import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelSourceComponent } from './channel-source.component';
import { SourceListComponent } from './source-list/source-list.component';

const routes: Routes = [
  {
    path:'', component: ChannelSourceComponent, children:[
      {
        path:'list', component:SourceListComponent
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
export class ChannelSourceRoutingModule { }
