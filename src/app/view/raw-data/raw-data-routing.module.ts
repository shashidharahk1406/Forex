import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RawDataComponent } from './raw-data.component';

const routes: Routes = [
  { path: '', component: RawDataComponent },
 ];

 @NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class RawDataRoutingModule { }
