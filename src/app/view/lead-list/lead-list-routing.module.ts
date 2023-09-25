import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LeadListComponent } from './lead-list.component';

const routes: Routes = [
  { path: '', component: LeadListComponent,children:[
    {path:'leadLayout',loadChildren:()=>import('./lead-layout/lead-layout.module').then(m=>m.LeadLayoutModule)}
  ]},

 ];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class LeadListRoutingModule { }
