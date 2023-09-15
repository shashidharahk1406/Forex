import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterListComponent } from './filter-list.component';

const routes: Routes = [
  {path:'',component:FilterListComponent,outlet: 'filterList',children:[
  ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilterListRoutingModule { }