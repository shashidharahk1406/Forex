import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpcomingTasksRoutingModule } from './upcoming-tasks-routing.module';
import { UpcomingTasksComponent } from './upcoming-tasks.component';



@NgModule({
  declarations: [
    UpcomingTasksComponent
  ],
  imports: [
    CommonModule,
    UpcomingTasksRoutingModule
  ]
})
export class UpcomingTasksModule { }
