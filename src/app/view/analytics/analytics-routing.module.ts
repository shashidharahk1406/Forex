import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from './analytics.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: AnalyticsComponent,children:[
    
      {path:'filterList',loadChildren:()=>import('./filter-list/filter-list.module').then(m=>m.FilterListModule)},
      {path:'',pathMatch:'full',redirectTo:'filterList'}
    
  ] },
  
 
 ];

 @NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
