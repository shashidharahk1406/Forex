import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UpcomingTasksComponent } from './upcoming-tasks.component';

const routes: Routes = [
  { path: '', component: UpcomingTasksComponent },
 ];

 @NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class UpcomingTasksRoutingModule { }
