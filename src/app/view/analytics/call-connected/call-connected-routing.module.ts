import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallConnectedComponent } from './call-connected.component';
import { CallConnectedTableComponent } from './call-connected-table/call-connected-table.component';

const routes: Routes = [
  {
    path:'', component:CallConnectedComponent, children:[
      {
        path:'list',component:CallConnectedTableComponent
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
export class CallConnectedRoutingModule { }
