import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFollowupsRoutingModule } from './my-followups-routing.module';
import { MyFollowupsComponent } from './my-followups.component';
import { MyFollowupLayoutModule } from './my-followup-layout/my-followup-layout.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material/daterangepicker.module';



@NgModule({
  declarations: [
    MyFollowupsComponent
  ],
  imports: [
    CommonModule,
    MyFollowupsRoutingModule,
    MyFollowupLayoutModule
  ]
})
export class MyFollowupsModule { }
