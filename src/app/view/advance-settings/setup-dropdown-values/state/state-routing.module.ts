import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateComponent } from './state.component';
import { StateListComponent } from './state-list/state-list.component';

const routes: Routes = [
  {
    path:'', component:StateComponent, children:[
      {
        path:'list', component:StateListComponent
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
export class StateRoutingModule { }
