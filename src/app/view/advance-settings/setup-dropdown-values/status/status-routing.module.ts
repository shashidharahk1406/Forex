import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatusComponent } from './status.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path:'', component:StatusComponent, children:[
      {
        path:'list', component:ListComponent
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
export class StatusRoutingModule { }
