import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StreamComponent } from './stream.component';
import { StreamListComponent } from './stream-list/stream-list.component';

const routes: Routes = [
  {
    path:'', component: StreamComponent, children:[
      {
        path:'list', component:StreamListComponent
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
export class StreamRoutingModule { }