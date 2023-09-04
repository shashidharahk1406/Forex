import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FailedLeadsComponent } from './failed-leads.component';

const routes: Routes = [
  { path: '', component: FailedLeadsComponent },
 ];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class FailedLeadsRoutingModule { }
