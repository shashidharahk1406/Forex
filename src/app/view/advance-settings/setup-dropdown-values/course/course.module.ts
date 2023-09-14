import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { CourseListComponent } from './course-list/course-list.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    CourseComponent,
    CourseListComponent,
    AddCourseComponent,
    EditCourseComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class CourseModule { }
