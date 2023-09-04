import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomReportsComponent } from './custom-reports.component';
const routes: Routes = [
  { path: '', component: CustomReportsComponent },
 ];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class CustomReportsRoutingModule { }
