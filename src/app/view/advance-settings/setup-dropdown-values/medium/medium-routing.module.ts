import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediumComponent } from './medium.component';
import { MediumListComponent } from './medium-list/medium-list.component';

const routes: Routes = [
  {
    path:'', component:MediumComponent, children:[
      {
        path:'list', component:MediumListComponent
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
export class MediumRoutingModule { }
