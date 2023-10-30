import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpcomingTaskLayoutRoutingModule } from './upcoming-task-layout-routing.module';
import { UpcomingTaskLayoutComponent } from './upcoming-task-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { TodaysNewTaskComponent } from './todays-new-task/todays-new-task.component';
import { TotalNewLeadComponent } from './total-new-lead/total-new-lead.component';
import { TodaysNewApplicationComponent } from './todays-new-application/todays-new-application.component';
import { TotalNewApplicationComponent } from './total-new-application/total-new-application.component';
import { TodaysIVRMissedcallLeadComponent } from './todays-ivr-missedcall-lead/todays-ivr-missedcall-lead.component';
import { TotalIVRMissedcallLeadComponent } from './total-ivr-missedcall-lead/total-ivr-missedcall-lead.component';
import { TodaysPendingFollowupsComponent } from './todays-pending-followups/todays-pending-followups.component';
import { TotalPendingFollowupsComponent } from './total-pending-followups/total-pending-followups.component';
import { MissedActivityComponent } from './missed-activity/missed-activity.component';
import { TodaysMissedFollowupComponent } from './todays-missed-followup/todays-missed-followup.component';


@NgModule({
  declarations: [
    UpcomingTaskLayoutComponent,
    TodaysNewTaskComponent,
    TotalNewLeadComponent,
    TodaysNewApplicationComponent,
    TotalNewApplicationComponent,
    TodaysIVRMissedcallLeadComponent,
    TotalIVRMissedcallLeadComponent,
    TodaysPendingFollowupsComponent,
    TotalPendingFollowupsComponent,
    MissedActivityComponent,
    TodaysMissedFollowupComponent
  ],
  imports: [
    CommonModule,
    UpcomingTaskLayoutRoutingModule,
    SharedModule,
    MaterialModule
  ],
  exports:[
    UpcomingTaskLayoutComponent
  ]
})
export class UpcomingTaskLayoutModule { }
