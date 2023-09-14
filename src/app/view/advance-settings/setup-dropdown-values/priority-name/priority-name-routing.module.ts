import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriorityNameComponent } from './priority-name.component';
import { PriorityNameListComponent } from './priority-name-list/priority-name-list.component';

const routes: Routes = [
  {
    path:'', component:PriorityNameComponent, children:[
      {
        path:'list', component:PriorityNameListComponent
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
export class PriorityNameRoutingModule { }
