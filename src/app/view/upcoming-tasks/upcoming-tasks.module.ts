import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpcomingTasksRoutingModule } from './upcoming-tasks-routing.module';
import { UpcomingTasksComponent } from './upcoming-tasks.component';
import { UpcomingTaskLayoutModule } from './upcoming-task-layout/upcoming-task-layout.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    UpcomingTasksComponent
  ],
  imports: [
    CommonModule,
    UpcomingTasksRoutingModule,
    UpcomingTaskLayoutModule,
    SharedModule
  ]
})
export class UpcomingTasksModule { }
