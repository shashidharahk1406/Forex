import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFollowupsRoutingModule } from './my-followups-routing.module';
import { MyFollowupsComponent } from './my-followups.component';



@NgModule({
  declarations: [
    MyFollowupsComponent
  ],
  imports: [
    CommonModule,
    MyFollowupsRoutingModule
  ]
})
export class MyFollowupsModule { }
